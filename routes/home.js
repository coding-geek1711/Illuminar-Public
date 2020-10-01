const express = require("express");
const homeRouter = express.Router();
const static = require("../static/static");
const methodOverride = require("method-override");

homeRouter.use(methodOverride("_method"));
homeRouter.delete("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

homeRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    static.name = req.user[0].dataValues.name;
  } else {
    static.name = "Illuminar";
  }
  static.css = "/css/styles.css";
  res.render("home", static);
});

homeRouter.get("/authorsPageIsHere", (req, res) => {
  res.render("author", static);
});

module.exports = homeRouter;
