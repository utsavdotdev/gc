import fs from "fs/promises";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const handleSetupCommand = async () => {
  try {
    logger.step(1, 3, "Creating CLI directory");
    const cliDir = path.join(os.homedir(), ".gc-cli");
    await fs.mkdir(cliDir, { recursive: true });

    logger.step(2, 3, "Installing shell integration");
    // Copy shell integration script
    const templatePath = path.join(
      __dirname,
      "../templates/shell-integration.sh"
    );
    const integrationPath = path.join(cliDir, "shell-integration.sh");
    await fs.copyFile(templatePath, integrationPath);
    await fs.chmod(integrationPath, 0o755);

    logger.step(3, 3, "Updating shell configuration");
    const shell = path.basename(os.userInfo().shell || process.env.SHELL || "");
    const configPath = path.join(os.homedir(), `.${shell}rc`);

    const configContent = await fs
      .readFile(configPath, "utf-8")
      .catch(() => "");
    if (!configContent.includes("GC CLI Integration")) {
      const shellConfig = `
# GC CLI Integration
source "${integrationPath}"
`;
      await fs.appendFile(configPath, shellConfig);
    }

    logger.done("Setup completed successfully!");
    logger.info("Please restart your terminal or run:");
    logger.info(`source ${configPath}`);
  } catch (error) {
    logger.error("Setup failed", error);
    process.exit(1);
  }
};
