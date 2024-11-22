import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, "config.js");

export const config = {
  ai: {
    model: "llama3-groq-70b-8192-tool-use-preview",
    temperature: 0.7,
    maxSuggestions: 3,
    prompts: {
      system:
        "You are an AI assistant generating git commit messages in JSON format following the Conventional Commits standard. Use the structure {commit: '(type)(scope): (message)'}, e.g., {commit: 'feat(cli): add new command'}. Messages must be concise, scope optional (one word max)",
      user: "Generate {count} different commit messages in JSON object for the following git diff:\n{diff} ",
    },
  },

  git: {
    defaultBranch: "main",
    commitTemplate: "{type}{scope}: {message}",
    conventionalCommitTypes: [
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "perf",
      "test",
      "build",
      "ci",
      "chore",
    ],
  },

  cli: {
    defaultLogLevel: "INFO",
    colors: {
      primary: "#36BCF7",
      success: "#2ECC71",
      error: "#E74C3C",
      warning: "#F1C40F",
    },
  },

  // API key will be set here
  apiKey: "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",
};

// Function to update API key in config file
export const updateApiKey = async (apiKey) => {
  try {
    const configContent = await fs.readFile(CONFIG_PATH, "utf-8");

    // Update only the apiKey in the config
    const updatedContent = configContent.replace(
      /apiKey:.*(?=,|\n)/,
      `apiKey: '${apiKey}'`
    );

    await fs.writeFile(CONFIG_PATH, updatedContent, "utf-8");
    return true;
  } catch (error) {
    logger.error("Failed to update API key", error);
    return false;
  }
};
