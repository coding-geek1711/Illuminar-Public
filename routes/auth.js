const express = require("express");
const authRouter = express.Router();
const static = require("../static/static");
const initialize = require("../helperFunctions/loginUser");
const { user } = require("../database/Models");
const passport = require("passport");
const {
  IfNotAuthenticatedThenProceed,
  CheckIfRegistrationCompleted,
} = require("../helperFunctions/validRouting");
const registerUser = require("../helperFunctions/registerUser");
initialize(
  passport,
  async (id) => await user.findAll({ where: { univId: id } }),
  async (id) => await user.findAll({ where: { univId: id } })
);

function renderLoginPage(req, res, message) {
  static.msg = message;
  static.css = "/css/styleslogin.css";
  static.scripts = "/js/scripts.js";
  console.log(message);
  res.render("auth", static);
  static.msg = "";
}

authRouter.get("/", IfNotAuthenticatedThenProceed, (req, res) => {
  static.css = "/css/styleslogin.css";
  static.scripts = "/js/scripts.js";
  res.render("auth", static);
  static.msg = "";
});

authRouter.post(
  "/login",
  IfNotAuthenticatedThenProceed,
  CheckIfRegistrationCompleted,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth",
    failureFlash: true,
  })
);
authRouter.post("/signup", IfNotAuthenticatedThenProceed, async (req, res) => {
  const { name, email, univId, password, confirmPassword } = req.body;
  const response = await registerUser(
    name,
    email,
    univId,
    password,
    confirmPassword
  );
  if (response == "Registered") {
    // User Registered
    renderLoginPage(req, res, response);
  } else {
    renderLoginPage(req, res, response[0]);
  }
});

module.exports = authRouter;
