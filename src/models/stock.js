const db = require("../../config/database");

const Stock = {
    // Create
    create: (nomstock, idproduit, quantite, callback) => {
        db.query("INSERT INTO stock (nomstock, idproduit, quantite) VALUES (?, ?, ?)", [nomstock, idproduit, quantite], callback);
    },

    // Read all
    findAll: (callback) => {
        db.query("SELECT s.*, p.nom as produit_nom FROM stock s JOIN produit p ON s.idproduit = p.id", callback);
    },

    // Read by id
    findById: (id, callback) => {
        db.query("SELECT s.*, p.nom as produit_nom FROM stock s JOIN produit p ON s.idproduit = p.id WHERE s.id = ?", [id], callback);
    },

    // Read by product
    findByProduit: (idproduit, callback) => {
        db.query("SELECT * FROM stock WHERE idproduit = ?", [idproduit], callback);
    },

    // Update
    update: (id, nomstock, idproduit, quantite, callback) => {
        db.query("UPDATE stock SET nomstock = ?, idproduit = ?, quantite = ? WHERE id = ?", [nomstock, idproduit, quantite, id], callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM stock WHERE id = ?", [id], callback);
    }
};

module.exports = Stock;