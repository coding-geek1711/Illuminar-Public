const express = require("express");
const projectUploadPage = express.Router();
const static = require("../static/static");
const expressFileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const {
  IfAuthenticatedThenProceed,
} = require("../helperFunctions/validRouting");

projectUploadPage.use(cors());
projectUploadPage.use(express.urlencoded({ extended: false }));
projectUploadPage.use(expressFileUpload());

projectUploadPage.get("/", IfAuthenticatedThenProceed, (req, res) => {
  if (req.isAuthenticated()) {
    static.name = req.user[0].dataValues.name;
  } else {
    static.name = "Illuminar";
  }
  static.css = "/css/stylesupload.css";
  static.scripts = "/js/upload.js";
  res.render("projectUploadPage", static);
});

projectUploadPage.post("/", IfAuthenticatedThenProceed, (req, res) => {
  // console.log(req.files);
  // console.log(req);
  // console.log(req.body);
  // console.log(typeof req.files);
  // req.files.forEach((file) =>
  //   file.mv(`../media/${file.name}`, (err) => console.error(err))
  // );
  Object.keys(req.files).forEach((key) => {
    // console.log(req.files[key].name);
    // req.files[key].mv(__dirname + `/media/${req.files[key].name}`, (err) =>
    //   console.log(err)
    // );
    req.files[key].mv(
      path.join(__dirname, `../media/${req.files[key].name}`),
      (err) => console.log(err)
    );
  });
});

module.exports = projectUploadPage;
