export default function handler(req, res) {
  // Get IP from x-forwarded-for header or fallback to req.socket.remoteAddress
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

  res.status(200).json({ ip });
}
