import { config } from "dotenv";
config();

import sequelize from "@/lib/db";
import "@/models/relation"; // importa solo per far partire le associazioni

async function init_DB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    await sequelize.sync({ alter: process.env.NEXT_ENV === "dev" });
    console.log("✅ Tables synchronized");

  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  } finally {
    await sequelize.close();
  }
}

init_DB();
