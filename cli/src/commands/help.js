import chalk from 'chalk';
import { logger } from '../utils/logger.js';

const helpText = `
${chalk.bold('Git Commit Message Generator (gc)')}

${chalk.yellow('Commands:')}
  gc new              Generate AI-powered commit messages
  gc help             Show this help message

${chalk.yellow('Options:')}
  -v, --version      Show version number
  -h, --help         Show help

${chalk.yellow('Examples:')}
  $ gc new           Generate commit messages for staged changes
  $ gc help          Display this help message

${chalk.yellow('Environment Variables:')}
  OPENAI_API_KEY     Your OpenAI API key
  LOG_LEVEL          Logging level (DEBUG|INFO|WARN|ERROR)
`;

export const showHelp = () => {
  logger.info(helpText);
};
