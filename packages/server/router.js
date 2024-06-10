const {Router} = require('express');
const productRouter = require('./routes/product');

const router = Router();
router.use('/product', productRouter);

module.exports = router;
