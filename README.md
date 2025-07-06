# 🌍 IP Geolocation API (Vercel Ready)

This is a simple, CORS-enabled API that returns the **geolocation information** of a client IP address using the free [`ipinfo.io`](https://ipinfo.io) service.

Built for deployment on [Vercel](https://vercel.com), this API automatically extracts the client’s IP and returns the city, region, country, coordinates, timezone, and ISP.

---

## 📦 Features

- ✅ Detects real client IP (`x-forwarded-for`)
- 🌐 Returns geolocation data using `ipinfo.io`
- 🔓 Supports CORS for use in browser apps (e.g. GitHub Pages)
- ⚡ Serverless & deployable to Vercel
- 🧪 No API key required for basic usage

---

## 📍 Example Response

```json
{
  "ip": "125.18.48.110",
  "city": "Bengaluru",
  "region": "Karnataka",
  "country": "India",
  "loc": "12.9719,77.5937",
  "org": "AS9498 BHARTI Airtel Ltd.",
  "timezone": "Asia/Kolkata"
}
```

## 🚀 Usage

# API Endpoint (after deploy)

```pgsql
GET api/get-ip
```

# Example (Client-side JS)

```js
fetch('https://ip-address-sigma.vercel.app/api/get-ip')
  .then(res => res.json())
  .then(console.log);
```

# Example (cURL)

```bash
curl https://ip-address-sigma.vercel.app/api/get-ip
```