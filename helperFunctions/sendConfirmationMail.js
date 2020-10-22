require("dotenv").config();

const nodemailer = require("nodemailer");

async function sendConfirmationEmail(name, email, univId, token) {
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
    to: `${email}`, // list of receivers
    subject: "Email Confirmation", // Subject line
    html: `<h1>Hello ${name}, University ID: ${univId}, from Illuminar Support Team!!!</h1>
      <br>
      <br>
      <p>Welcome to Illuminar!!! Complete your Registration Process to Access Your Dashboard Now!!!</p>
      <br>
      <br>
      <h3>Click on the Link given Below!!!<br>
              <a href="https://illuminarserver.azurewebsites.net/confirmation/${token}">https://illuminarserver.azurewebsites.net/confirmation/${token}</a></h3>
      <br>
      <br>
      `,
  });
  return "Email Sent";
}

module.exports = sendConfirmationEmail;
