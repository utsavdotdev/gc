import ora from 'ora';
import { logger } from '../utils/logger.js';

export const generateCommitMessages = async (gitDiff) => {
  const spinner = ora('Generating commit messages...').start();
  //set timeout to simulate ai response time
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  //dummy ai suggested commit messages
  const messages = [
    "feat: add user authentication system",
    "fix: resolve memory leak in background tasks",
    "docs: update API documentation with new endpoints",
  ];

  spinner.succeed('Generated commit messages');

  return messages;
};
