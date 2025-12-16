const express = require('express');
const router = express.Router();
const {
    createStock,
    getAllStocks,
    getStockById,
    getStocksByProduit,
    updateStock,
    deleteStock
} = require('../controllers/stockController');

router.post('/', createStock);
router.get('/', getAllStocks);
router.get('/:id', getStockById);
router.get('/produit/:idproduit', getStocksByProduit);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);

module.exports = router;