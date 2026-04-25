const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));   // we'll create public folder for frontend

const BYPASS_SERVICES = [
  "https://keybypass.net/?url=",
  "https://bypass.city/?url=",
  "https://bypass.link/?url=",
  "https://thebypasser.com/?url="
];

// Main route - your bypass page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint to process the link
app.post('/bypass', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('auth.platorelay.com')) {
    return res.status(400).json({ error: "Please provide a valid Platoboost / auth.platorelay.com link" });
  }

  try {
    // Try to return a direct bypass link using popular services
    const bypassLinks = BYPASS_SERVICES.map(service => service + encodeURIComponent(url));

    res.json({
      success: true,
      originalUrl: url,
      bypassOptions: bypassLinks,
      message: "Click any bypass link below. Most will give you the direct key page quickly."
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Try the manual bypass." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Delta Bypasser running on port ${PORT}`);
});
