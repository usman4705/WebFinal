const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    ph_number: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirm_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);

const UserModel = new mongoose.model("User", userScheme);

module.exports = UserModel;
