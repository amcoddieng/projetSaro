const Stock = require("../models/stock");

// Function to generate a unique 6-character matricule
const generateMatricule = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let matricule = '';
    for (let i = 0; i < 6; i++) {
        matricule += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return matricule;
};

// Create
const createStock = (req, res) => {
    const { idproduit, quantite } = req.body;
    if (!idproduit || quantite === undefined) {
        return res.status(400).json({ error: "idproduit et quantite requis !" });
    }
    const matricule_stock = generateMatricule();
    Stock.create(matricule_stock, idproduit, quantite, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                // If duplicate, try again
                return createStock(req, res);
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Stock créé", id: result.insertId, matricule_stock });
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