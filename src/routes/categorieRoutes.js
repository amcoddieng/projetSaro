const express = require('express');
const router = express.Router();
const {
    saveCategorie,
    getAllCategories,
    getCategorieById,
    updateCategorie,
    deleteCategorie
} = require('../controllers/categorieProdController');

router.post('/', saveCategorie);
router.get('/', getAllCategories);
router.get('/:id', getCategorieById);
router.put('/:id', updateCategorie);
router.delete('/:id', deleteCategorie);

module.exports = router;