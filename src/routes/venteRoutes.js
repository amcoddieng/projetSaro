const express = require("express");
const router = express.Router();
const venteController = require("../controllers/venteController");

// Routes pour les ventes
router.post("/", venteController.createVente);
router.get("/", venteController.getAllVentes);
router.get("/:id", venteController.getVenteById);
router.get("/produit/:idproduit", venteController.getVentesByProduit);
router.get("/stock/:matricule_stock", venteController.getVentesByStock);
router.put("/:id", venteController.updateVente);
router.delete("/:id", venteController.deleteVente);

module.exports = router;