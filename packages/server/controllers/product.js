const {Product} = require("../models");

module.exports.getProductList = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send({
      data: products
    });
  } catch (err) {
    res.status(400).send({
      errors: [{
        title: err.message
      }]
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    const newProductInsertData = {
      name: req.body.name,
      type: req.body.type,
      image: JSON.stringify(req.file),
    };
    const createdProduct = await Product.create(newProductInsertData);
    res.status(201).send({
      data: createdProduct,
    });
  } catch (err) {
    res.status(400).send({
      errors: [{
        title: err.message
      }]
    });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newProductInsertData = {
      name: req.body.name,
      type: req.body.type,
      image: JSON.stringify(req.file),
    };
    const product = await Product.findByPk(id);
    const updatedProduct = await product.update(newProductInsertData);
    res.status(200).send({
      data: updatedProduct,
    });
  } catch (err) {
    res.status(400).send({
      errors: [{
        title: err.message
      }]
    });
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    await product.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).send({
      errors: [{
        title: err.message
      }]
    });
  }
};
