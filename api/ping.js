import ping from 'ping';

export default async function handler(req, res) {
  const targetIP = req.query.ip;
  const PROBE_LOCATION = process.env.PROBE_LOCATION;

  if (!targetIP) {
    return res.status(400).json({ error: 'Missing ?ip= parameter' });
  }

  try {
    const result = await ping.promise.probe(targetIP, { timeout: 2 });
    const rtt = parseFloat(result.time);

    if (!result.alive || isNaN(rtt)) {
      return res.status(500).json({ error: 'Ping failed', ip: targetIP });
    }

    res.status(200).json({
      ip: targetIP,
      rtt_ms: rtt,
      probe_location: PROBE_LOCATION,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message });
  }
}
