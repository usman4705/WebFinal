const express = require("express");
const router = express.Router();

//const authController = require("../app/http/authController");
// const cartController = require("../app/http/customers/cartController");
const shopController = require("../app/http/shopController");
const authentication = require("../app/middlewares/userAuthentication");
// const orderController = require("../app/http/customers/orderController");

//console.log(auth.userAuth);
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/shop", shopController().shop);

router.get("/admin", authentication.checkAuthenticated, (req, res) => {
  res.render("admin");
});

router.get("/login", authentication.checkNotAuthenticated, (req, res) => {
  res.render("login");
});
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get("/register", authentication.checkNotAuthenticated, (req, res) => {
  res.render("register");
});

//Customer Routes
// router.post("/orders", orderController().order);
// router.get("/order", orderController().index);

// // router.get("*", (req, res) => {
// //   res.render("404", {
// //     errorcomment: "Opps, Page Not Found",
// //   });
// // });

module.exports = router;
