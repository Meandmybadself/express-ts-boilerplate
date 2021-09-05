import { Sequelize } from "sequelize-typescript";
import path from "path";

const initializeSequelize = async (): Promise<void> => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: process.env.SILENT !== "1",
    models: [path.resolve(__dirname, "models")],
  });

  const initializeBaseTables = async () => {
    console.log("🖋️  Initializing base tables.");
    try {
      // Do any database setup here.
    } catch {
      console.log("🚨 Error while initializing database. Exiting.");
      process.exit();
    }
  };

  (async () => {
    await sequelize.authenticate();
    console.info("🔌 Connected to database.");

    if (process.env.DB_INIT_BASE_TABLES === "1") {
      await sequelize.sync({ force: true });
      await initializeBaseTables();
    } else {
      console.log("Altering tables.");
      await sequelize.sync({ alter: true });
    }

    if (process.env.PREPUSH_CHECK) {
      console.log("✅ prepush check - Successfully started. Exiting.");
      process.exit();
    }
  })();
};

export default initializeSequelize;
