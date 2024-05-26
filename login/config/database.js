import { Sequelize } from "sequelize";

const db = new Sequelize('pweb_transkrip','root','',{
host: "localhost",
dialect: "mysql"
});

export default db;