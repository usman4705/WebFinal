// const express = require("express");
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "rehanshakir-com",
//   api_key: "542656843685259",
//   api_secret: "_nY_4ZeWx9hqy2yxxQkvxTzo2W0",
// });

// const router = express.Router();

// const ProductModel = require("../../models/product");

// /*Get All Products */
// router.get("/", async (req, res) => {
//   let Products = await ProductModel.find();
//   return res.send(Products);
// });

// /*  Get One Product */
// router.get("/:id", async (req, res) => {
//   let Product = await ProductModel.findById(req.params.id);
//   return res.send(Product);
// });

// /* POST A NEW PRODUCT */
// router.post("/", async (req, res) => {
//   console.log("In Photo");
//   try {
//     const file = req.files.photo;
//     const imageURL = await cloudinary.uploader.upload(
//       file.tempFilePath,
//       (err, result) => {
//         return result, err;
//       }
//     );
//     console.log("In try");

//     let Product = new ProductModel();
//     Product.name = req.body.name;
//     Product.price = req.body.price;
//     Product.category = req.body.category;
//     Product.tags = req.body.tags;
//     Product.stock = req.body.stock;
//     Product.productImage = imageURL.url;

//     await Product.save();
//     return res.send(Product);
//   } catch (error) {
//     res.send(error);
//   }
// });

// /*Update A Product */
// router.put("/:id", async (req, res) => {
//   const file = req.files.photo;
//   const imageURL = await cloudinary.uploader.upload(
//     file.tempFilePath,
//     (err, result) => {
//       return result;
//     }
//   );
//   try {
//     let Product = await ProductModel.findById(req.params.id);
//     Product.name = req.body.name;
//     Product.price = req.body.price;
//     Product.category = req.body.category;
//     Product.tags = req.body.tags;
//     Product.stock = req.body.stock;
//     Product.productImage = imageURL.url;

//     await Product.save();
//     return res.send(Product);
//   } catch (error) {
//     res.send(error);
//     console.log(error.message);
//   }
// });

// /*Delete a Product */
// router.delete("/:id", async (req, res) => {
//   let Product = await ProductModel.findByIdAndDelete(req.params.id);
//   return res.send(Product);
// });

// module.exports = router;
