require("dotenv").config();

const bcrypt = require("bcryptjs");
const {
  doesUserExist,
  insertUserToUsers,
  updatePassword,
} = require("../database/dbFunctions");
const { user } = require("../database/Models");
const jwt = require("jsonwebtoken");
const static = require("../static/static");
async function updatePasswordOnReset(req) {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;
  // Form Validation
  let errors = [];
  if (password !== confirmPassword) {
    errors.push("Passwords must match!!");
  }
  if (password.length <= 5) {
    errors.push("Password must be greater than 6 characters");
  }
  if (errors.length > 0) {
    return errors;
  } else {
    try {
      const { email, univId } = await jwt.verify(token, process.env.RESET_PASS);

      const hashPass = await bcrypt.hash(password, 10);
      const response = await updatePassword(hashPass, univId);
      return "Password Changed Successfully";
    } catch (error) {
      throw error;
      return "Token Expired";
    }
    // try {
    //   const tokenDetails = await tokens.findAll({
    //     where: {
    //       token,
    //     },
    //   });
    //   const hashPass = await bcrypt.hash(password, 10);
    //   const response = await updatePassword(
    //     hashPass,
    //     tokenDetails[0].dataValues.univId
    //   );
    //   return "Password Changed Successfully";
    // } catch (error) {
    //   throw error;
    // }
  }
}

/*
   try {
      const { email, univId } = await jwt.verify(
        req.params.token,
        process.env.RESET_PASS
      );
      const response = await updatePasswordOnReset(email, univId, req);
    } catch (error) {
      throw error;
    }
*/
module.exports = updatePasswordOnReset;
