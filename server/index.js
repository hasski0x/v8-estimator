const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

app.post('/api/estimate', (req, res) => {
  const { height, width, qty, colour } = req.body;
  const h = parseFloat(height);
  const w = parseFloat(width);
  const q = parseFloat(qty);

  if (isNaN(h) || isNaN(w) || isNaN(q)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const sqm = (h * w * q) / 1000000;
  const costPrice = sqm * 250;
  const sellPrice = sqm * 490;

  res.json({ sqm, costPrice, sellPrice, totalCost: sellPrice });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
