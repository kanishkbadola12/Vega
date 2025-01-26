const express = require('express');
const app = express();
const { assets } = require('./mocks/assets.json');
const prices = require('./mocks/prices.json');
const portfolio = require('./mocks/portfolio.json');
const cors = require('cors');

app.use(cors());

app.get('/assets', (req, res) => {
    const { asset, assetClass } = req.query;
    console.log('Search Query:', asset, assetClass)

    res.json(assets);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});