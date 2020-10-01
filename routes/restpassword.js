require("dotenv").config();

const express = require("express");
const resetPassRouter = express.Router();
const static = require("../static/static");
const jwt = require("jsonwebtoken");
const { doesUserExist2 } = require("../database/dbFunctions");
const {
  IfNotAuthenticatedThenProceed,
} = require("../helperFunctions/validRouting");
const { user } = require("../database/Models");
const updatePasswordOnReset = require("../helperFunctions/updatePassword");
const sendMail = require("../helperFunctions/sendMail");

resetPassRouter.get("/", IfNotAuthenticatedThenProceed, (req, res) => {
  if (req.isAuthenticated()) {
    // Dont render page
    res.redirect("/");
  }
  static.css = "/css/styleslogin.css";
  static.scripts = "/js/scripts.js";
  res.render("resetpassword", static);
});

resetPassRouter.post("/", IfNotAuthenticatedThenProceed, async (req, res) => {
  // Check if user exists
  let errors = [];
  const response = await doesUserExist2(req.body.email, req.body.univId);
  console.log(response);
  if (response.length == 0) errors.push("User Doesnt Exist");
  if (errors.length > 0) {
    static.msg = errors[0];
    res.redirect("/resetpassword");
  } else {
    sendMail(req.body);
    static.msg = "Message sent to registered email";
    res.redirect("/auth");
  }
});

resetPassRouter.get(
  "/:token",
  IfNotAuthenticatedThenProceed,
  async (req, res) => {
    try {
      const { email, univId } = await jwt.verify(
        req.params.token,
        process.env.RESET_PASS
      );

      const response = await user.findAll({
        where: {
          email: email,
          univId: univId,
        },
      });

      if (response.length > 0) {
        // User exists
        static.css = "/css/styleslogin.css";
        static.token = req.params.token;
        res.render("changepassword", static);
      } else {
        static.msg = "No user found";
        res.redirect("/auth");
      }
    } catch (error) {
      // throw error;
      static.msg = "Token Expired";
      res.redirect("/auth");
    }
  }
);

resetPassRouter.post(
  "/:token",
  IfNotAuthenticatedThenProceed,
  async (req, res) => {
    const response = await updatePasswordOnReset(req);
    if (response == "Password Changed Successfully") {
      static.msg = response;
      res.redirect("/auth");
    } else if (response == "Token Expired") {
      static.msg = response;
      res.redirect("/auth");
    } else {
      static.msg = response[0];
      res.redirect(`/resetpassword/${req.params.token}`);
    }
  }
);

module.exports = resetPassRouter;
