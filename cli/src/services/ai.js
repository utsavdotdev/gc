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
  let cleaned = output.replace(/```(?:json)?\s*([\s\S]*?)```/g, "$1");

  cleaned = cleaned.replace(/`/g, "");

  cleaned = cleaned
    .replace(/\\"/g, '"')
    .replace(/^"(.*)"$/, "$1")
    .replace(/^json\s*/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    try {
      if (!cleaned.startsWith("[") && cleaned.includes("{")) {
        return JSON.parse(`[${cleaned}]`);
      }
      if (!cleaned.startsWith("{")) {
        return JSON.parse(`{${cleaned}}`);
      }
      throw e;
    } catch (error) {
      throw error;
    }
  }
};
