var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

var visitanosRouter = require("./routes/visitanos");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var plantelRouter = require("./routes/plantel");
var novedadesRouter = require("./routes/novedades");
var historiaRouter = require("./routes/historia");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/visitanos", visitanosRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/plantel",plantelRouter);
app.use("/novedades",novedadesRouter);
app.use("/historia",historiaRouter);


app.get('/visitanos' , function(req,res){
  res.render('visitanos')
})

app.get('/plantel' , function(req,res){
  res.render('plantel')
})

app.get('/novedades' , function(req,res){
  res.render('novedades')
})

app.get('/historia' , function(req,res){
  res.render('historia')
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
