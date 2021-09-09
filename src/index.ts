console.log(`API ${process.env.ENV}`);

import initSequelize from "./sequelize";
import { initExpress } from "./express";

(async () => {
  try {
    await initSequelize();
    await initExpress();
  } catch (error: unknown) {
    console.error("Error during initialization", error);
  }
})();
