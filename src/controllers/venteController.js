const db = require("../../config/database");
const Vente = require("../models/vente");

// Create
const createVente = (req, res) => {
    const { idproduit, matricule_stock, quantite } = req.body;
    if (!idproduit || !matricule_stock || !quantite) {
        return res.status(400).json({ error: "idproduit, matricule_stock et quantite requis !" });
    }

    // Start transaction
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Get stock id and current quantity
        db.query("SELECT id, quantite FROM stock WHERE matricule_stock = ?", [matricule_stock], (err, stockResults) => {
            if (err) {
                return db.rollback(() => res.status(500).json({ error: err.message }));
            }
            if (stockResults.length === 0) {
                return db.rollback(() => res.status(404).json({ error: "Stock non trouvé" }));
            }
            const stock = stockResults[0];
            if (stock.quantite < quantite) {
                return db.rollback(() => res.status(400).json({ error: "Quantité insuffisante en stock" }));
            }

            // Get price
            db.query("SELECT montant FROM prix WHERE id_produit = ? AND id_stock = ? ORDER BY date_ajoute DESC LIMIT 1", [idproduit, stock.id], (err, prixResults) => {
                if (err) {
                    return db.rollback(() => res.status(500).json({ error: err.message }));
                }
                if (prixResults.length === 0) {
                    return db.rollback(() => res.status(404).json({ error: "Prix non trouvé pour ce produit et stock" }));
                }
                const prix = prixResults[0].montant;
                const montant = prix * quantite;

                // Decrement stock
                db.query("UPDATE stock SET quantite = quantite - ? WHERE id = ?", [quantite, stock.id], (err) => {
                    if (err) {
                        return db.rollback(() => res.status(500).json({ error: err.message }));
                    }

                    // Insert vente
                    Vente.create(idproduit, matricule_stock, quantite, montant, (err, result) => {
                        if (err) {
                            return db.rollback(() => res.status(500).json({ error: err.message }));
                        }

                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => res.status(500).json({ error: err.message }));
                            }
                            res.status(201).json({ message: "Vente créée", id: result.insertId, montant });
                        });
                    });
                });
            });
        });
    });
};

// Read all
const getAllVentes = (req, res) => {
    Vente.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by id
const getVenteById = (req, res) => {
    const { id } = req.params;
    Vente.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Vente non trouvée" });
        res.json(results[0]);
    });
};

// Read by produit
const getVentesByProduit = (req, res) => {
    const { idproduit } = req.params;
    Vente.findByProduit(idproduit, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by stock
const getVentesByStock = (req, res) => {
    const { matricule_stock } = req.params;
    Vente.findByStock(matricule_stock, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update
const updateVente = (req, res) => {
    const { id } = req.params;
    const { idproduit, matricule_stock, quantite, montant } = req.body;
    if (!idproduit || !matricule_stock || !quantite || !montant) {
        return res.status(400).json({ error: "Tous les champs requis !" });
    }
    Vente.update(id, idproduit, matricule_stock, quantite, montant, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Vente non trouvée" });
        res.json({ message: "Vente mise à jour" });
    });
};

// Delete
const deleteVente = (req, res) => {
    const { id } = req.params;
    Vente.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Vente non trouvée" });
        res.json({ message: "Vente supprimée" });
    });
};

module.exports = {
    createVente,
    getAllVentes,
    getVenteById,
    getVentesByProduit,
    getVentesByStock,
    updateVente,
    deleteVente
};