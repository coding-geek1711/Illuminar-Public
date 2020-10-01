const express = require("express");
const singleProject = express.Router();
const static = require("../static/static");

const {
  IfAuthenticatedThenProceed,
} = require("../helperFunctions/validRouting");

singleProject.get("/", IfAuthenticatedThenProceed, (req, res) => {
  if (req.isAuthenticated()) {
    static.name = req.user[0].dataValues.name;
    console.log(req.user[0].dataValues.name);
  } else {
    static.name = "Illuminar";
  }
  static.css = "/css/single-project-styles.css";
  static.scripts = "";
  res.render("singleProject", static);
});

module.exports = singleProject;
