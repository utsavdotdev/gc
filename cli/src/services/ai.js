import ora from "ora";
import { logger } from "../utils/logger.js";
import { config } from "../utils/config.js";
import Groq from "groq-sdk";

const createAIClient = () => {
  if (!config.apiKey) {
    throw new Error(
      "Groq API key not found. Please set it using:\n" +
        "gc config set-key your-api-key"
    );
  }
  return new Groq({ apiKey: config.apiKey });
};

export const generateCommitMessages = async (gitDiff) => {
  const spinner = ora("Generating commit messages...").start();

  try {
    const ai = createAIClient();
    const { choices } = await ai.chat.completions.create({
      model: config.ai.model,
      messages: [
        {
          role: "system",
          content: config.ai.prompts.system,
        },
        {
          role: "user",
          content: config.ai.prompts.user
            .replace("{count}", config.ai.maxSuggestions)
            .replace("{diff}", gitDiff),
        },
      ],
      temperature: config.ai.temperature,
      response_format: { type: "json_object" },
    });
    spinner.succeed("Generated commit messages");

    const jsonMsg = choices[0].message.content;
    const commitMsgs = [];
    const parsedMsg = JSON.parse(jsonMsg);
    if (parsedMsg.commit) {
      commitMsgs.push(parsedMsg.commit);
    } else {
      for (const key in parsedMsg) {
        if (parsedMsg.hasOwnProperty(key)) {
          commitMsgs.push(parsedMsg[key]);
        }
      }
    }
    return commitMsgs;
  } catch (error) {
    spinner.fail("Failed to generate commit messages");
    logger.error("AI service error:", error);
    process.exit(1);
  }
};
