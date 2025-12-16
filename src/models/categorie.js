const db = require("../../config/database");

const Categorie = {
    // Create
    create: (nom, callback) => {
        db.query("INSERT INTO catalogue (nom) VALUES (?)", [nom], callback);
    },

    // Read all
    findAll: (callback) => {
        db.query("SELECT * FROM catalogue", callback);
    },

    // Read by id
    findById: (id, callback) => {
        db.query("SELECT * FROM catalogue WHERE id = ?", [id], callback);
    },

    // Update
    update: (id, nom, callback) => {
        db.query("UPDATE catalogue SET nom = ? WHERE id = ?", [nom, id], callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM catalogue WHERE id = ?", [id], callback);
    }
};

module.exports = Categorie;