import ora from "ora";
import { logger } from "../utils/logger.js";
import { config } from "../utils/config.js";
import fetchGraphQL from "../utils/api.js";

const INVOKE_MODEL = `
  query GenerateCommitMessage($instruction: String!, $prompt: String!) {
    generateCommitMessage(instruction: $instruction, prompt: $prompt)
  }
`;

export const generateCommitMessages = async (gitDiff) => {
  const spinner = ora("Generating commit messages...").start();
  try {
    if (
      config.ai.model !== "meta-llama/Meta-Llama-3.1-8B-Instruct" &&
      !config.apiKey
    ) {
      throw new Error(
        "Model API key not found. Please set it using:\n" +
          "gc config set-key your-api-key"
      );
    }
    const data = await fetchGraphQL(INVOKE_MODEL, {
      instruction: config.ai.prompts.system,
      prompt: config.ai.prompts.user.replace("{diff}", gitDiff),
    });

    spinner.succeed("Generated commit messages");

    const jsonMsg = data?.generateCommitMessage;
    const parsedMsg = cleanAiOutput(jsonMsg);
    const commitMsgs = parsedMsg;
    return commitMsgs;
  } catch (error) {
    spinner.fail("Failed to generate commit messages");
    logger.error("AI service error", error);
    process.exit(1);
  }
};

const cleanAiOutput = (input) => {
  // Step 1: Remove Markdown code block delimiters
  let cleanInput = input.trim();
  if (cleanInput.startsWith("```") && cleanInput.endsWith("```")) {
    cleanInput = cleanInput.slice(3, -3).trim();
  }

  // Step 2: Normalize input by replacing single quotes with double quotes
  cleanInput = cleanInput
    .replace(/'/g, '"') // Replace single quotes with double quotes
    .replace(/([{,]\s*)([a-zA-Z0-9_]+):/g, '$1"$2":'); // Ensure keys are quoted

  // Step 3: Attempt to parse JSON array
  if (cleanInput.startsWith("[") && cleanInput.endsWith("]")) {
    try {
      const parsedArray = JSON.parse(cleanInput);
      if (Array.isArray(parsedArray)) {
        return parsedArray.map((item) => ({
          commit: item.commit,
        }));
      }
    } catch (e) {
      console.error("Error parsing JSON array:", e.message);
    }
  }

  // Step 4: Fallback for JSON-like objects
  if (cleanInput.startsWith("{") && cleanInput.endsWith("}")) {
    try {
      const extractedCommits = [];
      const matches = cleanInput.match(/"commit":\s*"([^"]+)"/g);
      if (matches) {
        matches.forEach((match) => {
          const commitMessage = match.match(/"commit":\s*"([^"]+)"/)[1];
          extractedCommits.push({ commit: commitMessage });
        });
        return extractedCommits;
      }
    } catch (e) {
      console.error("Error parsing JSON-like object:", e.message);
    }
  }

  // Step 5: Fallback for non-standard formats
  const regex = /{commit:\s*['"]([^'"]+)['"]}/g;
  let matches;
  const results = [];
  while ((matches = regex.exec(cleanInput)) !== null) {
    results.push({ commit: matches[1] });
  }

  // Step 6: If no matches, treat each line as a commit message
  if (results.length === 0) {
    const lines = cleanInput.split("\n").map((line) => line.trim());
    for (const line of lines) {
      if (line) {
        const commitRegex = /"commit":\s*"([^"]+)"/;
        const match = commitRegex.exec(line);
        if (match) {
          results.push({ commit: match[1] });
        } else {
          results.push({ commit: line });
        }
      }
    }
  }

  return results;
};
