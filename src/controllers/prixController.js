const Prix = require("../models/prix");

// Create
const savePrix = (req, res) => {
    const { id_produit, id_stock, montant } = req.body;
    if (!id_produit || !id_stock || !montant) {
        return res.status(400).json({ error: "id_produit, id_stock et montant requis !" });
    }
    Prix.create(id_produit, id_stock, montant, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Prix créé", id: result.insertId });
    });
};

// Read all
const getAllPrix = (req, res) => {
    Prix.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by id
const getPrixById = (req, res) => {
    const { id } = req.params;
    Prix.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Prix non trouvé" });
        res.json(results[0]);
    });
};

// Read by produit
const getPrixByProduit = (req, res) => {
    const { id_produit } = req.params;
    Prix.findByProduit(id_produit, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by stock
const getPrixByStock = (req, res) => {
    const { id_stock } = req.params;
    Prix.findByStock(id_stock, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update
const updatePrix = (req, res) => {
    const { id } = req.params;
    const { id_produit, id_stock, montant } = req.body;
    if (!id_produit || !id_stock || !montant) {
        return res.status(400).json({ error: "id_produit, id_stock et montant requis !" });
    }
    Prix.update(id, id_produit, id_stock, montant, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Prix non trouvé" });
        res.json({ message: "Prix mis à jour" });
    });
};

// Delete
const deletePrix = (req, res) => {
    const { id } = req.params;
    Prix.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Prix non trouvé" });
        res.json({ message: "Prix supprimé" });
    });
};

module.exports = {
    savePrix,
    getAllPrix,
    getPrixById,
    getPrixByProduit,
    getPrixByStock,
    updatePrix,
    deletePrix
};