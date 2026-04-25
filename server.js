const express = require('express');
const { chromium } = require('playwright');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/bypass', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('auth.platorelay.com')) {
    return res.json({ success: false, message: "❌ Invalid Platoboost link" });
  }

  res.json({ success: true, message: "🚀 Adrien’s Bypass starting headless browser... This may take 20-60 seconds." });

  // Background processing (not waiting for response to keep UI responsive)
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle' });

    // Basic auto-click logic for common steps (you can expand this)
    await page.waitForTimeout(5000); // wait for initial load

    // Try clicking common "Continue" buttons
    try {
      await page.click('text=Continue', { timeout: 10000 });
    } catch (e) {}

    // Wait for key page or ad checkpoint
    await page.waitForTimeout(15000);

    const finalContent = await page.content();
    const pageUrl = page.url();

    console.log("Final URL:", pageUrl);

    await browser.close();

    // In a real advanced version, we would parse the page for the key here
  } catch (error) {
    console.error("Bypass error:", error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Adrien’s Bypass running on port ${PORT}`);
});
