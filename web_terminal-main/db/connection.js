const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rehan:rehan@cluster0.qhfay.mongodb.net/PSL?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to Database");
    console.log(error.message);
  });
