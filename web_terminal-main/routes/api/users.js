const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/user");
const flash = require("express-flash");
const passport = require("passport");
let userAuth = false;

/* GET users listing. */
router.get("/", async (req, res) => {
  let Users = await UserModel.find();
  return res.send(Users);
});

/*Get One User */
router.get("/:id", async (req, res) => {
  let User = await UserModel.findById(req.params.id);
  return res.send(User);
});

/*Post New User */
router.post("/register", async (req, res) => {
  try {
    let { name, email, ph_number, password, confirm_password } = req.body;

    if (!name || !email || !ph_number || !password || !confirm_password) {
      req.flash("error", "All fields are required");
      req.flash("name", name);
      req.flash("email", email);
      req.flash("ph_number", ph_number);
      return res.redirect("/register");
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      req.flash("error", "User already registered");
      return res.redirect("/register");
    }
    if (password === confirm_password) {
      const hashPassword = await bcrypt.hash(password, 10);
      let User = new UserModel();
      User.name = name;
      User.email = email;
      User.ph_number = ph_number;
      User.password = hashPassword;
      User.confirm_password = hashPassword;

      await User.save();
      //login
    } else {
      req.flash("error", "Password Not Matched");
      req.flash("name", name);
      req.flash("email", email);
      req.flash("ph_number", ph_number);
      res.redirect("/register");
    }
  } catch (error) {
    // req.flash("error", "User Already Registered");
    // res.redirect("/register");
    res.status(404).send(error);
  }
});

/*User Authentication & Authorization */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
module.exports.userAuth = false;
