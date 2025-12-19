const db = require("../../config/database");

const Produit = {
    // Create
    create: (nom, chemin_image, id_sous_categorie, callback) => {
        db.query("INSERT INTO produit (nom, chemin_image, id_sous_categorie) VALUES (?, ?, ?)", [nom, chemin_image, id_sous_categorie], callback);
    },

    // Read all
    findAll: (callback) => {
        db.query("SELECT p.*, sc.nom as sous_categorie_nom, c.nom as categorie_nom FROM produit p JOIN sous_categorie sc ON p.id_sous_categorie = sc.id JOIN catalogue c ON sc.id_catalogue = c.id", callback);
    },

    // Read by id
    findById: (id, callback) => {
        db.query("SELECT p.*, sc.nom as sous_categorie_nom, c.nom as categorie_nom FROM produit p JOIN sous_categorie sc ON p.id_sous_categorie = sc.id JOIN catalogue c ON sc.id_catalogue = c.id WHERE p.id = ?", [id], callback);
    },

    // Read by sous_categorie
    findBySousCategorie: (id_sous_categorie, callback) => {
        db.query("SELECT * FROM produit WHERE id_sous_categorie = ?", [id_sous_categorie], callback);
    },

    // Update
    update: (id, nom, chemin_image, id_sous_categorie, callback) => {
        db.query("UPDATE produit SET nom = ?, chemin_image = ?, id_sous_categorie = ? WHERE id = ?", [nom, chemin_image, id_sous_categorie, id], callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM produit WHERE id = ?", [id], callback);
    }
};

module.exports = Produit;