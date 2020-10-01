const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");

const user = sequelize.define("users", {
  name: {
    defaultValue: null,
    type: Sequelize.STRING,
  },
  email: {
    defaultValue: null,
    type: Sequelize.STRING,
    unique: true,
  },
  univId: {
    defaultValue: null,
    type: Sequelize.STRING,
    unique: true,
  },
  confirmedUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING(100),
  },
});

const projects = sequelize.define("projects", {
  project_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  project_date_of_Registration: {
    type: Sequelize.DATEONLY,
  },
  guide_name: {
    type: Sequelize.STRING,
  },
  project_type: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  project_year: {
    type: Sequelize.STRING,
  },
});

const images = sequelize.define("images", {
  image_path: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});
// user.sync({ force: true });

module.exports = { user };
