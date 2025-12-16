const Produit = require("../models/produit");

// Create
const saveProd = (req, res) => {
    const { nom, id_sous_categorie } = req.body;
    if (!nom || !id_sous_categorie) {
        return res.status(400).json({ error: "Nom et id_sous_categorie requis !" });
    }
    Produit.create(nom, id_sous_categorie, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Produit créé", id: result.insertId });
    });
};

// Read all
const getAllProduits = (req, res) => {
    Produit.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by id
const getProduitById = (req, res) => {
    const { id } = req.params;
    Produit.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Produit non trouvé" });
        res.json(results[0]);
    });
};

// Read by sous_categorie
const getProduitsBySousCategorie = (req, res) => {
    const { id_sous_categorie } = req.params;
    Produit.findBySousCategorie(id_sous_categorie, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update
const updateProduit = (req, res) => {
    const { id } = req.params;
    const { nom, id_sous_categorie } = req.body;
    if (!nom || !id_sous_categorie) {
        return res.status(400).json({ error: "Nom et id_sous_categorie requis !" });
    }
    Produit.update(id, nom, id_sous_categorie, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Produit non trouvé" });
        res.json({ message: "Produit mis à jour" });
    });
};

// Delete
const deleteProduit = (req, res) => {
    const { id } = req.params;
    Produit.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Produit non trouvé" });
        res.json({ message: "Produit supprimé" });
    });
};

module.exports = {
    saveProd,
    getAllProduits,
    getProduitById,
    getProduitsBySousCategorie,
    updateProduit,
    deleteProduit
};