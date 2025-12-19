const db = require("../../config/database");

const Vente = {
    // Create
    create: (idproduit, matricule_stock, quantite, montant, callback) => {
        db.query("INSERT INTO vente (idproduit, matricule_stock, quantite, montant) VALUES (?, ?, ?, ?)", [idproduit, matricule_stock, quantite, montant], callback);
    },

    // Read all
    findAll: (callback) => {
        db.query("SELECT v.*, p.nom as produit_nom FROM vente v JOIN produit p ON v.idproduit = p.id", callback);
    },

    // Read by id
    findById: (id, callback) => {
        db.query("SELECT v.*, p.nom as produit_nom FROM vente v JOIN produit p ON v.idproduit = p.id WHERE v.id = ?", [id], callback);
    },

    // Read by produit
    findByProduit: (idproduit, callback) => {
        db.query("SELECT v.*, p.nom as produit_nom FROM vente v JOIN produit p ON v.idproduit = p.id WHERE v.idproduit = ?", [idproduit], callback);
    },

    // Read by stock
    findByStock: (matricule_stock, callback) => {
        db.query("SELECT v.*, p.nom as produit_nom FROM vente v JOIN produit p ON v.idproduit = p.id WHERE v.matricule_stock = ?", [matricule_stock], callback);
    },

    // Update
    update: (id, idproduit, matricule_stock, quantite, montant, callback) => {
        db.query("UPDATE vente SET idproduit = ?, matricule_stock = ?, quantite = ?, montant = ? WHERE id = ?", [idproduit, matricule_stock, quantite, montant, id], callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM vente WHERE id = ?", [id], callback);
    }
};

module.exports = Vente;