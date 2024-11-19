import { OpenAI } from 'openai';
import ora from 'ora';
import { logger } from '../utils/logger.js';

export const generateCommitMessages = async (gitDiff) => {
  const spinner = ora('Generating commit messages...').start();
  
};
