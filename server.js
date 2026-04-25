const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const BYPASS_SITES = [
  "https://keybypass.net/?url=",
  "https://bypass.city/?url=",
  "https://bypass.link/?url="
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/bypass', (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('auth.platorelay.com')) {
    return res.status(400).json({ error: "Paste a valid auth.platorelay.com link" });
  }

  const bypassLinks = BYPASS_SITES.map(site => site + encodeURIComponent(url));

  res.json({
    success: true,
    message: "Opening the fastest bypasser...",
    bypassLinks: bypassLinks
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Delta Bypasser running on port ${PORT}`));
