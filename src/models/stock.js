const db = require("../../config/database");

const Stock = {
    // Create
    create: (matricule_stock, idproduit, quantite, callback) => {
        db.query("INSERT INTO stock (matricule_stock, idproduit, quantite) VALUES (?, ?, ?)", [matricule_stock, idproduit, quantite], callback);
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
    update: (id, matricule_stock, idproduit, quantite, callback) => {
        let query = "UPDATE stock SET idproduit = ?, quantite = ?";
        let params = [idproduit, quantite];
        if (matricule_stock) {
            query += ", matricule_stock = ?";
            params.unshift(matricule_stock);
        }
        query += " WHERE id = ?";
        params.push(id);
        db.query(query, params, callback);
    },

    // Delete
    delete: (id, callback) => {
        db.query("DELETE FROM stock WHERE id = ?", [id], callback);
    }
};

module.exports = Stock;