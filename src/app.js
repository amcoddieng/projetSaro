const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const categorieRoutes = require('./routes/categorieRoutes');
const sousCategorieRoutes = require('./routes/sous_categorieRoutes');
const produitRoutes = require('./routes/produitRoutes');
const stockRoutes = require('./routes/stockRoutes');
const prixRoutes = require('./routes/prixRoutes');
const venteRoutes = require('./routes/venteRoutes');

app.use('/api/categories', categorieRoutes);
app.use('/api/sous-categories', sousCategorieRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/prix', prixRoutes);
app.use('/api/ventes', venteRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
