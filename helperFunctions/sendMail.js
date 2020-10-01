require("dotenv").config();

const nodemailer = require("nodemailer");
const { user } = require("../database/Models");

const jwt = require("jsonwebtoken");
const resetPassRouter = require("../routes/restpassword");

async function sendMail(body) {
  const userexistence = await user.findAll({
    where: {
      univId: body.univId,
      email: body.email,
    },
  });
  if (userexistence.length == 1) {
    const resetPassToken = await jwt.sign(
      {
        email: body.email,
        univId: body.univId,
      },
      process.env.RESET_PASS,
      {
        expiresIn: 60 * 30,
      }
    );
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ADMIN_USERNAME, // generated ethereal user
        pass: process.env.ADMIN_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Illuminar Support Team" <info@illuminar.com>', // sender address
      to: `${body.email}`, // list of receivers
      subject: "Password Reset TOKEN", // Subject line
      html: `<h1>Hello from Illuminar Support Team!!!</h1>
    <br>
    <br>
    <p>It seems that a new password reset token was requested by you for your<br>
    Illuminar Account. Enclosed with this email is your Password Reset Token <br>
    Do note that this token is valid only for the next 30 minutes after which<br>
    it will expire and you will have to request for a new one</p>
    <br>
    <br>
    <h3>Your Password Reset Link is <br>
            <a href="https://illuminar-eeefisat-dev.herokuapp.com/resetpassword/${resetPassToken}">https://illuminar-eeefisat-dev.herokuapp.com/resetpassword/${resetPassToken}</a></h3>
    <br>
    <br>
    <p>Enter the above Token and reset your password. If you still cant retrieve<br>
    your account, please contact the administrator</p>
    `,
    });
    return "Email Sent";
  } else {
    return "No User Exists";
  }
}

module.exports = sendMail;
