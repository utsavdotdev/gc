import fs from "fs";
import path from "path";
import { config } from "../utils/config.js";
import { logger } from "../utils/logger.js";

const CONFIG_PATH = path.resolve(process.cwd(), "cli/src/utils/config.js");

export const handleOptOutCommand = () => {
  try {
    // Update the config file to set data-collection to false
    const updatedConfig = { ...config, "data-collection": false };

    const configContent = `export const config = ${JSON.stringify(
      updatedConfig,
      null,
      2
    )};`;

    fs.writeFileSync(CONFIG_PATH, configContent);
    logger.done("Data collection has been disabled.");
  } catch (error) {
    console.error("Error disabling data collection:", error);
  }
};

export const handleOptInCommand = () => {
  try {
    // Update the config file to set data-collection to true
    const updatedConfig = { ...config, "data-collection": true };

    const configContent = `export const config = ${JSON.stringify(
      updatedConfig,
      null,
      2
    )};`;

    fs.writeFileSync(CONFIG_PATH, configContent);
    logger.done("Data collection has been enabled.");
  } catch (error) {
    console.error("Error enabling data collection:", error);
  }
};
