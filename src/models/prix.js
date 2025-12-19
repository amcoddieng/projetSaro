const db = require("../../config/database");

const Prix = {
    // Create
    create: (id_produit, id_stock, montant, callback) => {
        db.query("INSERT INTO prix (id_produit, id_stock, montant) VALUES (?, ?, ?)", [id_produit, id_stock, montant], callback);
    },

    // Read all
    findAll: (callback) => {
        db.query("SELECT p.*, pr.nom as produit_nom, s.nomstock as stock_nom FROM prix p JOIN produit pr ON p.id_produit = pr.id JOIN stock s ON p.id_stock = s.id", callback);
    },

    // Read by id
    findById: (id, callback) => {
        db.query("SELECT p.*, pr.nom as produit_nom, s.nomstock as stock_nom FROM prix p JOIN produit pr ON p.id_produit = pr.id JOIN stock s ON p.id_stock = s.id WHERE p.id = ?", [id], callback);
    },

    // Read by produit
    findByProduit: (id_produit, callback) => {
        db.query("SELECT p.*, s.nomstock as stock_nom FROM prix p JOIN stock s ON p.id_stock = s.id WHERE p.id_produit = ?", [id_produit], callback);
    },

    // Read by stock
    findByStock: (id_stock, callback) => {
        db.query("SELECT p.*, pr.nom as produit_nom FROM prix p JOIN produit pr ON p.id_produit = pr.id WHERE p.id_stock = ?", [id_stock], callback);
    },

    // Update
    update: (id, id_produit, id_stock, montant, callback) => {
        db.query("UPDATE prix SET id_produit = ?, id_stock = ?, montant = ? WHERE id = ?", [id_produit, id_stock, montant, id], callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM prix WHERE id = ?", [id], callback);
    }
};

module.exports = Prix;