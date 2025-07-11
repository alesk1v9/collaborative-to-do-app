import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME!, // ! means that the value is not null or undefined
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        dialectModule: mysql2,
        dialectOptions: {
            ssl: false, // <- força conexão sem SSL (resolve handshake bugado do caching_sha2)
        },
    }
)

export default sequelize;