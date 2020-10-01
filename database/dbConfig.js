const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  // "postgres://postgres:password@localhost:5432/illuminar"
  process.env.DATABASE_URL
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
