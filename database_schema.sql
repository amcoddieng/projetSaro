-- Script SQL pour créer les tables de la base de données 'safia'
-- Hiérarchie: catalogue -> sous_categorie -> produit

-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS safia;
USE safia;

-- Table des catégories (catalogue)
CREATE TABLE IF NOT EXISTS catalogue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL UNIQUE
);

-- Table des sous-catégories
CREATE TABLE IF NOT EXISTS sous_categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    id_catalogue INT NOT NULL,
    FOREIGN KEY (id_catalogue) REFERENCES catalogue(id) ON DELETE CASCADE
);

-- Table des produits
CREATE TABLE IF NOT EXISTS produit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    chemin_image VARCHAR(500),
    id_sous_categorie INT NOT NULL,
    FOREIGN KEY (id_sous_categorie) REFERENCES sous_categorie(id) ON DELETE CASCADE
);

-- Table du stock
CREATE TABLE IF NOT EXISTS stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricule_stock VARCHAR(6) UNIQUE NOT NULL,
    datecreation DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateupdate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    idproduit INT NOT NULL,
    quantite INT NOT NULL,
    FOREIGN KEY (idproduit) REFERENCES produit(id) ON DELETE CASCADE
);

-- Table des prix
CREATE TABLE IF NOT EXISTS prix (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produit INT NOT NULL,
    id_stock INT NOT NULL,
    date_ajoute DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    montant DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_produit) REFERENCES produit(id) ON DELETE CASCADE,
    FOREIGN KEY (id_stock) REFERENCES stock(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_sous_categorie_catalogue ON sous_categorie(id_catalogue);
CREATE INDEX idx_produit_sous_categorie ON produit(id_sous_categorie);
CREATE INDEX idx_stock_produit ON stock(idproduit);
CREATE INDEX idx_prix_produit ON prix(id_produit);
CREATE INDEX idx_prix_stock ON prix(id_stock);