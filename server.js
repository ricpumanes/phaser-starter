const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3010;

app.use(express.static(path.join(__dirname, './')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`app is now running at http://localhsot:${PORT}`);
});
