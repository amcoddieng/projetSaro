const db = require("../../config/database");

const SousCategorie = {
    // Create
    create: (nom, id_catalogue, callback) => {
        db.query("INSERT INTO sous_categorie (nom, id_catalogue) VALUES (?, ?)", [nom, id_catalogue], callback);
    },

    // Read all
    findAll: (callback) => {
        db.query("SELECT sc.*, c.nom as categorie_nom FROM sous_categorie sc JOIN catalogue c ON sc.id_catalogue = c.id", callback);
    },

    // Read by id
    findById: (id, callback) => {
        db.query("SELECT sc.*, c.nom as categorie_nom FROM sous_categorie sc JOIN catalogue c ON sc.id_catalogue = c.id WHERE sc.id = ?", [id], callback);
    },

    // Read by categorie
    findByCategorie: (id_catalogue, callback) => {
        db.query("SELECT * FROM sous_categorie WHERE id_catalogue = ?", [id_catalogue], callback);
    },

    // Update
    update: (id, nom, id_catalogue, callback) => {
        db.query("UPDATE sous_categorie SET nom = ?, id_catalogue = ? WHERE id = ?", [nom, id_catalogue, id], callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM sous_categorie WHERE id = ?", [id], callback);
    }
};

module.exports = SousCategorie;