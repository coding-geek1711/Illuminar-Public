const express = require("express");
const projectUploadPage = express.Router();
const static = require("../static/static");
const expressFileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const {
  IfAuthenticatedThenProceed,
} = require("../helperFunctions/validRouting");

projectUploadPage.use(cors());
projectUploadPage.use(express.urlencoded({ extended: false }));
projectUploadPage.use(expressFileUpload());
projectUploadPage.use("/media", express.static("media"));

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
  console.log(req);
  if (req.files) {
    Object.keys(req.files).forEach((key) => {
      req.files[key].mv(
        path.join(__dirname, `../media/${req.files[key].name}`),
        (err) => console.log(err)
      );
    });
  }
});

projectUploadPage.get("/images", (req, res) => {
  let array = [];
  fs.readdir(path.join(__dirname, "../media"), (err, files) => {
    files.forEach((file) => {
      console.log(file);
      // static.images = `./media/${file}`;
      array.push(`./media/${file}`);
    });
    static.images = array;
    res.render("images", static);
  });
});

module.exports = projectUploadPage;
