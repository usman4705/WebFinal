const Product = require("../../models/product");
function shopController() {
  return {
    async shop(req, res) {
      const products = await Product.find();
      return res.render("shop", { products: products });
    },
  };
}

module.exports = shopController;
