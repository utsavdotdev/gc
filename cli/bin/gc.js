#!/usr/bin/env node

import { Command } from "commander";
import { handleNewCommand } from "../src/commands/new.js";
import { showHelp } from "../src/commands/help.js";
import { handleOptOutCommand, handleOptInCommand } from "../src/commands/opt.js";
import {} from "dotenv/config";

const program = new Command();

const initializeCLI = () => {
  program
    .version("1.0.4")
    .description("AI-powered Git commit message generator");

  program
    .command("new")
    .description("Generate new commit messages using AI")
    .option('-c, --custom', 'Write custom commit message directly')
    .action(handleNewCommand);

  program
    .command("help")
    .description("Display help information")
    .action(showHelp);

  program
    .command("opt-out")
    .description("Disable anonymous data collection")
    .action(handleOptOutCommand);

  program
    .command("opt-in")
    .description("Enable anonymous data collection")
    .action(handleOptInCommand);

  return program;
};

// Bootstrap the application
const app = initializeCLI();
app.parse(process.argv);

// Show help by default if no command is provided
if (!process.argv.slice(2).length) {
  app.outputHelp();
}

process.removeAllListeners("warning");
