const express = require('express');
const router = express.Router();
const {
    saveProd,
    getAllProduits,
    getProduitById,
    getProduitsBySousCategorie,
    updateProduit,
    deleteProduit
} = require('../controllers/ProduitController');

router.post('/', saveProd);
router.get('/', getAllProduits);
router.get('/:id', getProduitById);
router.get('/sous-categorie/:id_sous_categorie', getProduitsBySousCategorie);
router.put('/:id', updateProduit);
router.delete('/:id', deleteProduit);

module.exports = router;