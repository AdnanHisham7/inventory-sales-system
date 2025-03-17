const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, role } = require('../middleware/authMiddleware');

router.get('/', productController.getAllProducts);  //✅
router.get('/:barcode', productController.getProductByBarcode)
router.put('/stock/:id', auth, productController.updateStock);
router.put('/:id', auth, role('admin'), productController.updateProduct); //✅
router.post('/', auth, role('admin'), productController.createProduct); //✅
router.post('/details', productController.getProductsDetails);
router.put('/:id/toggle-product', auth, role('admin'), productController.toggleProduct); //✅

module.exports = router;
