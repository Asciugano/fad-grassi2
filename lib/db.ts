import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(
  process.env.PSQL_DB_NAME!,
  process.env.PSQL_USER!,
  process.env.PSQL_PASSW,
  {
    host: process.env.PSQL_HOST!,
    port: parseInt(process.env.PSQL_PORT!),
    dialect: 'postgres',
    logging: false,
  }
);

export const connect_DB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Succesfully connected to PostgreSQL database');

    await sequelize.sync({ alter: process.env.NEXT_ENV! === "dev" });
    console.log('Succesfully syncronized the tabeles');
  } catch (error) {
    console.error(error);
  }
}

export default sequelize;
