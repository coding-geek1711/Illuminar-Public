require("dotenv").config();

const express = require("express");
const confirmationRouter = express.Router();
const static = require("../static/static");
const { user } = require("../database/Models");
const jwt = require("jsonwebtoken");

const {
  IfAuthenticatedThenProceed,
  IfNotAuthenticatedThenProceed,
  CheckIfRegistrationCompleted,
} = require("../helperFunctions/validRouting");

confirmationRouter.get(
  "/:token",
  IfNotAuthenticatedThenProceed,
  async (req, res) => {
    const token = req.params.token;
    try {
      const { email, univId } = await jwt.verify(
        token,
        process.env.EMAIL_SECRET
      );
      user.update(
        { confirmedUser: true },
        {
          where: {
            univId,
            email,
          },
        }
      );
      static.msg = "User Confirmed. You can now Login";
      res.redirect("/auth");
    } catch (error) {
      static.msg = "Token Expired. Register Again!!!";
      res.redirect("/auth");
    }
  }
);

module.exports = confirmationRouter;
