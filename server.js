require("dotenv").config();

// Import Modules
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const passport = require("passport");
const expressFlash = require("express-flash");
const expressSession = require("express-session");
const methodOverride = require("method-override");
// App Declaration
const app = express();
// App middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.use(expressFlash());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use("/", require("./routes/home"));
app.use("/confirmation", require("./routes/confirmation"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/singleProject", require("./routes/singleProject"));
app.use("/projectUploadPage", require("./routes/projectUploadPage"));
app.use("/auth", require("./routes/auth"));
app.use("/about", require("./routes/about"));
app.use("/exhibits", require("./routes/exhibits"));
app.use("/resetpassword", require("./routes/restpassword"));
// App Routes

// App PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
