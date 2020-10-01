const express = require("express");
const dashboardRouter = express.Router();
const static = require("../static/static");

const {
  IfAuthenticatedThenProceed,
} = require("../helperFunctions/validRouting");

dashboardRouter.get("/", IfAuthenticatedThenProceed, (req, res) => {
  if (req.isAuthenticated()) {
    static.name = req.user[0].dataValues.name;
    console.log(req.user[0].dataValues.name);
  } else {
    static.name = "Illuminar";
  }
  static.css = "/css/stylesdashboard.css";
  static.scripts = "";
  res.render("dashboard", static);
});

module.exports = dashboardRouter;
