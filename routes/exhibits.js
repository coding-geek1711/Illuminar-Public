const express = require("express");
const exhibitsRouter = express.Router();
const static = require("../static/static");

exhibitsRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    static.name = req.user[0].dataValues.name;
    console.log(req.user[0].dataValues.name);
  } else {
    static.name = "Illuminar";
  }
  static.css = "/css/exhibits-styles.css";
  static.scripts = "/js/exhibit-control.js";
  res.render("exhibits", static);
});

module.exports = exhibitsRouter;
