const Categorie = require("../models/categorie");

// Create
const saveCategorie = (req, res) => {
    const { nom } = req.body;
    if (!nom) {
        return res.status(400).json({ error: "Nom de catégorie requis !" });
    }
    Categorie.create(nom, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Catégorie créée", id: result.insertId });
    });
};

// Read all
const getAllCategories = (req, res) => {
    Categorie.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by id
const getCategorieById = (req, res) => {
    const { id } = req.params;
    Categorie.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
        res.json(results[0]);
    });
};

// Update
const updateCategorie = (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    if (!nom) {
        return res.status(400).json({ error: "Nom de catégorie requis !" });
    }
    Categorie.update(id, nom, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
        res.json({ message: "Catégorie mise à jour" });
    });
};

// Delete
const deleteCategorie = (req, res) => {
    const { id } = req.params;
    Categorie.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
        res.json({ message: "Catégorie supprimée" });
    });
};

module.exports = {
    saveCategorie,
    getAllCategories,
    getCategorieById,
    updateCategorie,
    deleteCategorie
};