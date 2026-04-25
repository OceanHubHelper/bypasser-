const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/bypass', (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('auth.platorelay.com')) {
    return res.json({ error: "Please paste a valid Platoboost link" });
  }

  // For now: return direct bypass suggestion + note
  res.json({
    success: true,
    message: "Processing your link...",
    note: "Full auto-bypass is blocked by Platoboost. Try the manual fast option below."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Delta Bypasser running on ${PORT}`));
