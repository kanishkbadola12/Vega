const express = require('express');
const app = express();
const { assets } = require('./mocks/assets.json');
const { prices } = require('./mocks/prices.json');
const  { portfolios } = require('./mocks/portfolio.json');
const cors = require('cors');

app.use(cors());

app.get('/assets', (req, res) => {
  const { view } = req.query;

  const totalAssetClassPrices = [];

  const totalAssetPrices = [];

  if (view === 'assetClass') {
    assets.forEach(asset => {
      const priceData = prices.find(price => price.id === asset.id);

      if (priceData) {
        const existingAssetClass = totalAssetClassPrices.find(item => item.name.toLowerCase() === asset.type.toLocaleLowerCase());

        if (existingAssetClass) {
          existingAssetClass.price += priceData.price;
        } else {
          totalAssetClassPrices.push({
            name: asset.type.charAt(0).toUpperCase() + asset.type.slice(1),
            price: priceData.price,
          });
        }
      }
    });

    res.json(totalAssetClassPrices);
  } else if (view === 'asset') {
    assets.forEach(asset => {
      const priceData = prices.find(price => price.id === asset.id);

      if (priceData) {
        const existingAsset = totalAssetPrices.find(item => item.name.toLowerCase() === asset.name.toLocaleLowerCase());

        if (existingAsset) {
          existingAsset.price += priceData.price;
        } else {
          totalAssetPrices.push({
            name: asset.name.charAt(0).toUpperCase() + asset.name.slice(1),
            price: priceData.price,
          });
        }
      }
    });

    res.json(totalAssetPrices);
  }
});

app.get('/portfolios', (req, res) => {
  const totalPortfolioValue = [];

  portfolios.forEach(portfolio => {
    const date = portfolio.asOf.split('T')[0];

    const totalPrice = portfolio.positions.reduce((acc, position) => {
      const positionTotalPrice = position.price * position.quantity;
      return acc + positionTotalPrice;
    }, 0);

    totalPortfolioValue.push({ date, totalPrice });
  });

  res.json(totalPortfolioValue);
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});