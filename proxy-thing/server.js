const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing 'url' query parameter");
  }

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    res.status(500).send("Error fetching content: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
