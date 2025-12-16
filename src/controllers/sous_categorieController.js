const SousCategorie = require("../models/sous_categorie");

// Create
const saveSousCategorie = (req, res) => {
    const { nom, id_catalogue } = req.body;
    if (!nom || !id_catalogue) {
        return res.status(400).json({ error: "Nom et id_catalogue requis !" });
    }
    SousCategorie.create(nom, id_catalogue, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Sous-catégorie créée", id: result.insertId });
    });
};

// Read all
const getAllSousCategories = (req, res) => {
    SousCategorie.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Read by id
const getSousCategorieById = (req, res) => {
    const { id } = req.params;
    SousCategorie.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Sous-catégorie non trouvée" });
        res.json(results[0]);
    });
};

// Read by categorie
const getSousCategoriesByCategorie = (req, res) => {
    const { id_catalogue } = req.params;
    SousCategorie.findByCategorie(id_catalogue, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update
const updateSousCategorie = (req, res) => {
    const { id } = req.params;
    const { nom, id_catalogue } = req.body;
    if (!nom || !id_catalogue) {
        return res.status(400).json({ error: "Nom et id_catalogue requis !" });
    }
    SousCategorie.update(id, nom, id_catalogue, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Sous-catégorie non trouvée" });
        res.json({ message: "Sous-catégorie mise à jour" });
    });
};

// Delete
const deleteSousCategorie = (req, res) => {
    const { id } = req.params;
    SousCategorie.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Sous-catégorie non trouvée" });
        res.json({ message: "Sous-catégorie supprimée" });
    });
};

module.exports = {
    saveSousCategorie,
    getAllSousCategories,
    getSousCategorieById,
    getSousCategoriesByCategorie,
    updateSousCategorie,
    deleteSousCategorie
};
