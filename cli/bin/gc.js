#!/usr/bin/env node

import { Command } from "commander";
import { handleNewCommand } from "../src/commands/new.js";
import { handleSetupCommand } from "../src/commands/setup.js";
import { handleSuggestCommand } from "../src/commands/suggest.js";
import { showHelp } from "../src/commands/help.js";

const program = new Command();

const initializeCLI = () => {
  program
    .version("1.0.0")
    .description("AI-powered Git commit message generator");

  program
    .command("new")
    .description("Generate new commit messages using AI")
    .action(handleNewCommand);

  program
    .command("setup")
    .description("Setup the CLI")
    .action(handleSetupCommand);

  program
    .command("suggest")
    .description("Generate commit suggestions using AI")
    .action(handleSuggestCommand);

  program
    .command("help")
    .description("Display help information")
    .action(showHelp);

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
