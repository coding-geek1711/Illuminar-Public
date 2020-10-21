const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "postgres://postgres:password@localhost:5432/illuminar"
//   // process.env.DATABASE_URL
// );
const sequelize = new Sequelize(
  "illuminardb",
  "illuminar_admin",
  "FISAT@1234",
  {
      dialect:"mssql",
    host: "illuminar.database.windows.net",
    port: 1433,
    ssl: true,
  }
);


async function testActivity() {
  try {
    await sequelize.authenticate();
    console.log(`Successful connection`);
  } catch (error) {
    console.error(`Unable to connect, ERROR: ${error}`);
  }
}
// testActivity();

module.exports = sequelize;
