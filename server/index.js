const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const SECRET = process.env.JWT_SECRET || 'secret';
const USERNAME = process.env.USERNAME || 'admin';
const PASSWORD = process.env.PASSWORD || 'password';

app.use(cors());
app.use(express.json());

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/estimate', authenticate, (req, res) => {
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
