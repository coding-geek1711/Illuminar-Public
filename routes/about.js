const express = require("express");
const aboutRouter = express.Router();
const static = require("../static/static");

aboutRouter.get("/", (req, res) => {
  //   res.send("Auth");
  if (req.isAuthenticated()) {
    static.name = req.user[0].dataValues.name;
    console.log(req.user[0].dataValues.name);
  } else {
    static.name = "Illuminar";
  }
  static.css = "/css/stylesabout.css";
  static.scripts = "/js/javascriptabout.js";
  res.render("about", static);
});

module.exports = aboutRouter;
