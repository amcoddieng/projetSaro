const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const categorieRoutes = require('./routes/categorieRoutes');
const sousCategorieRoutes = require('./routes/sous_categorieRoutes');
const produitRoutes = require('./routes/produitRoutes');

app.use('/api/categories', categorieRoutes);
app.use('/api/sous-categories', sousCategorieRoutes);
app.use('/api/produits', produitRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
