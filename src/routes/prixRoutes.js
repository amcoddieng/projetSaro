const express = require("express");
const router = express.Router();
const prixController = require("../controllers/prixController");

// Routes pour les prix
router.post("/", prixController.savePrix);
router.get("/", prixController.getAllPrix);
router.get("/:id", prixController.getPrixById);
router.get("/produit/:id_produit", prixController.getPrixByProduit);
router.get("/stock/:id_stock", prixController.getPrixByStock);
router.put("/:id", prixController.updatePrix);
router.delete("/:id", prixController.deletePrix);

module.exports = router;