require("dotenv").config();

const {
  doesUserExist,
  insertUserToUsers,
  updatePassword,
} = require("../database/dbFunctions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendConfirmationMail = require("./sendConfirmationMail");
async function registerUser(name, email, univId, password, confirmPassword) {
  // form validation
  let errors = [];
  // Check if user exists
  const response = await doesUserExist(email, univId);
  if (response.length > 0) {
    //user exists
    errors.push("User Exists");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords dont match!!!");
  }

  if (password.length <= 6) {
    errors.push("Password must be greater than 6 characters");
  }

  if (!univId.includes("FIT", 0) || !univId.includes("EE", 3)) {
    errors.push("Students must be from FISAT EEE To Register");
  }

  if (errors.length > 0) {
    return errors;
  } else {
    // register user as form validation is complete
    try {
      const hashPass = await bcrypt.hash(password, 10);
      const response = insertUserToUsers(name, email, univId, hashPass);
      const token = await jwt.sign(
        {
          univId,
          email,
        },
        process.env.EMAIL_SECRET,
        {
          expiresIn: 60 * 30,
        }
      );
      await sendConfirmationMail(name, email, univId, token);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = registerUser;
