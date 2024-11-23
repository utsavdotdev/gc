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
    const commitMsgs = Array.isArray(parsedMsg) ? parsedMsg : [parsedMsg];

    return commitMsgs.map((msg) =>
      typeof msg === "string" ? msg : msg.commit || msg
    );
  } catch (error) {
    spinner.fail("Failed to generate commit messages");
    logger.error("AI service error", error);
    process.exit(1);
  }
};

const cleanAiOutput = (output) => {
  if (typeof output === "object") {
    return Array.isArray(output) ? output : [output];
  }

  try {
    // Try parsing as JSON first
    const parsed = JSON.parse(output);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    // Split and clean the output
    const commits = output
      .split(/\n|(?=\d+\.)/)  // Split on newlines or numbered items
      .map(line => line.trim())
      .filter(Boolean)  // Remove empty lines
      .map(line => {
        // Extract commit message, handling various formats
        const message = line
          .replace(/^\d+\.\s*/, '')  // Remove leading numbers
          .replace(/^{commit:\s*["']?/, '')  // Remove {commit: prefix
          .replace(/["'}]\s*}$/, '')  // Remove trailing quotes and }
          .replace(/^commit:\s*["']?/, '')  // Remove commit: prefix
          .replace(/["']$/, '')  // Remove trailing quotes
          .trim();

        return { commit: message };
      });

    return commits.length ? commits : [{ commit: output.trim() }];
  }
};
