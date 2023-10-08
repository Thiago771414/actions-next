const express = require('express');
const app = express();

const mid = (req, res) => {
  res.send("Hello World Node.js community!");
};

app.get('/', mid);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});