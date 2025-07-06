
import express from 'express';
import ping from 'ping';

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with city name this probe is running in
const PROBE_LOCATION = process.env.PROBE_LOCATION;

app.get('/ping', async (req, res) => {
  const targetIP = req.query.ip;

  if (!targetIP) {
    return res.status(400).json({ error: 'Missing ?ip= parameter' });
  }

  try {
    const result = await ping.promise.probe(targetIP, { timeout: 2 });
    const rtt = parseFloat(result.time);

    if (!result.alive || isNaN(rtt)) {
      return res.status(500).json({ error: 'Ping failed', ip: targetIP });
    }

    res.json({
      ip: targetIP,
      rtt_ms: rtt,
      probe_location: PROBE_LOCATION,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Probe server running from ${PROBE_LOCATION} on port ${PORT}`);
});
