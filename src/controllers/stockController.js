const Stock = require("../models/stock");

// Create
const createStock = (req, res) => {
    const { nomstock, idproduit, quantite } = req.body;
    if (!nomstock || !idproduit || quantite === undefined) {
        return res.status(400).json({ error: "nomstock, idproduit et quantite requis !" });
    }
    Stock.create(nomstock, idproduit, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Stock créé", id: result.insertId });
    });
};

// Read all
const getAllStocks = (req, res) => {
    Stock.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by id
const getStockById = (req, res) => {
    const { id } = req.params;
    Stock.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Stock non trouvé" });
        res.json(results[0]);
    });
};

// Read by product
const getStocksByProduit = (req, res) => {
    const { idproduit } = req.params;
    Stock.findByProduit(idproduit, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update
const updateStock = (req, res) => {
    const { id } = req.params;
    const { nomstock, idproduit, quantite } = req.body;
    if (!nomstock || !idproduit || quantite === undefined) {
        return res.status(400).json({ error: "nomstock, idproduit et quantite requis !" });
    }
    Stock.update(id, nomstock, idproduit, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Stock non trouvé" });
        res.json({ message: "Stock mis à jour" });
    });
};

// Delete
const deleteStock = (req, res) => {
    const { id } = req.params;
    Stock.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Stock non trouvé" });
        res.json({ message: "Stock supprimé" });
    });
};

module.exports = {
    createStock,
    getAllStocks,
    getStockById,
    getStocksByProduit,
    updateStock,
    deleteStock
};