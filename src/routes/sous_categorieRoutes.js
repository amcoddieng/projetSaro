const express = require('express');
const router = express.Router();
const {
    saveSousCategorie,
    getAllSousCategories,
    getSousCategorieById,
    getSousCategoriesByCategorie,
    updateSousCategorie,
    deleteSousCategorie
} = require('../controllers/sous_categorieController');

router.post('/', saveSousCategorie);
router.get('/', getAllSousCategories);
router.get('/:id', getSousCategorieById);
router.get('/categorie/:id_catalogue', getSousCategoriesByCategorie);
router.put('/:id', updateSousCategorie);
router.delete('/:id', deleteSousCategorie);

module.exports = router;