//const axios = require("axios");
//import noty from "noty";

$(function () {
  let addToCart = document.querySelectorAll(".cart-button");
  const alertMsg = document.querySelector(".alert");
  removeAlert(alertMsg);
  cart(addToCart);
});

function updateCart(product) {
  let cartCounter = document.querySelector(".cartCounter");

  _id = product._id;
  name = product.name;
  price = product.price;
  category = product.category;
  tags = product.tags;
  stock = product.stock;
  productImage = product.productImage;

  $.ajax({
    url: "/update-cart",
    method: "POST",
    data: {
      _id,
      name,
      price,
      category,
      tags,
      stock,
      productImage,
    },
    success: function (res) {
      cartCounter.innerText = res.totalQty;
      new AWN().success("Item Added To Cart", {
        durations: { success: 2000 },
      });
    },
  });
}

function cart(addToCart) {
  addToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let product = JSON.parse(btn.dataset.product);
      updateCart(product);
    });
  });
}

//removing alert after
function removeAlert(alertMsg) {
  if (alertMsg) {
    setTimeout(() => {
      alertMsg.remove();
    }, 2000);
  }
}
