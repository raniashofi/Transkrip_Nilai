import { Sequelize } from "sequelize";

const db = new Sequelize('tb_transkrip','root','',{
host: "localhost",
dialect: "mysql"
});

export default db;