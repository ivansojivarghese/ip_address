export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();

    res.status(200).json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      loc: data.loc, // latitude,longitude string
      org: data.org, // ISP
      timezone: data.timezone
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch geolocation', details: error.message });
  }
}
