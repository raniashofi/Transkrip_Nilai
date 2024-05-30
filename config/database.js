const Sequelize = require("sequelize");

const db = new Sequelize("pweb_transkrip", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
