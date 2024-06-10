const {Router} = require('express');
const ProductController = require("../controllers/product");
const multer  = require('multer');

const upload = multer({storage: multer.memoryStorage()});

const productRouter = Router();
productRouter.get('/', ProductController.getProductList);
productRouter.post('/', upload.single('image'), ProductController.createProduct);
productRouter.delete('/:id', ProductController.deleteProduct);
productRouter.put('/:id', upload.single('image'), ProductController.updateProduct);

module.exports = productRouter;
