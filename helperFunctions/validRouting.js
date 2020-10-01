const static = require("../static/static");
const { user } = require("../database/Models");

function IfAuthenticatedThenProceed(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth");
  }
}

function IfNotAuthenticatedThenProceed(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

async function CheckIfRegistrationCompleted(req, res, next) {
  const response = await user.findAll({
    where: {
      univId: req.body.univId,
    },
  });
  if (response.length > 0) {
    // next();
    if (response[0].dataValues.confirmedUser) {
      // log the user
      next();
    } else {
      static.msg = "Confirm the User First!!!";
      res.redirect("/auth");
    }
  } else {
    static.msg = "User Doesnt Exist";
    res.redirect("/auth");
  }
}

module.exports = {
  IfAuthenticatedThenProceed,
  IfNotAuthenticatedThenProceed,
  CheckIfRegistrationCompleted,
};
