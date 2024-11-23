#!/usr/bin/env node

import { Command } from "commander";
import { handleNewCommand } from "../src/commands/new.js";
import {handleSetKeyCommand} from "../src/commands/set-key.js"
import { showHelp } from "../src/commands/help.js";
import {} from "dotenv/config";

const program = new Command();

const initializeCLI = () => {
  program
    .version("1.0.0")
    .description("AI-powered Git commit message generator");

  program
    .command("new")
    .description("Generate new commit messages using AI")
    .option('-c, --custom', 'Write custom commit message directly')
    .action(handleNewCommand);
  
  program
    .command("set-key <apiKey>")
    .description("Set Groq API key")
    .action(handleSetKeyCommand);

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
