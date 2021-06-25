require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");

//Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");

const app = express();
require("./db/connection");

//Session Configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
      mongoUrl:
        "mongodb+srv://rehan:rehan@cluster0.qhfay.mongodb.net/shop?retryWrites=true&w=majority",
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
  })
);

//Passport Configuration
const passportConfig = require("./app/config/passport");
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(cors());

const static_path = path.join(__dirname, "./public");
const views_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);
hbs.registerHelper("json", function (obj) {
  return JSON.stringify(obj);
});
hbs.registerHelper("ternary", require("handlebars-helper-ternary"));
hbs.registerHelper("multiply", function (val1, val2) {
  return val1 * val2;
});
hbs.registerHelper("counter", function (index) {
  return index + 1;
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//global middleware

app.use((req, res, next) => {
  res.locals.session = req.sessions;
  next();
});

app.use(function (req, res, next) {
  // Permission to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  //res.setHeader("Content-Type", "text/plain");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});
app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// Add headers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
