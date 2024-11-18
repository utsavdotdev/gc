import { OpenAI } from 'openai';
import ora from 'ora';
import { config } from '../utils/config.js';
import { logger } from '../utils/logger.js';

const createAIClient = (apiKey) => {
  return new OpenAI({ apiKey });
};

const createCommitPrompt = (gitDiff) => ({
  model: config.ai.model,
  messages: [
    {
      role: "system",
      content: config.ai.prompts.system
    },
    {
      role: "user",
      content: config.ai.prompts.user
        .replace('{count}', config.ai.maxSuggestions)
        .replace('{diff}', gitDiff)
    }
  ],
  n: config.ai.maxSuggestions,
  temperature: config.ai.temperature
});

export const generateCommitMessages = async (gitDiff) => {
  const spinner = ora('Generating commit messages...').start();
  const ai = createAIClient(process.env.OPENAI_API_KEY);

  try {
    const { choices } = await ai.chat.completions.create(
      createCommitPrompt(gitDiff)
    );

    spinner.succeed('Generated commit messages');
    return choices.map(({ message }) => message.content.trim());
  } catch (error) {
    spinner.fail('Failed to generate commit messages');
    logger.error('AI service error:', error);
    throw error;
  }
};
