import chalk from 'chalk';
import { config } from '../utils/config.js';

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  SUCCESS: 2,
  WARN: 3,
  ERROR: 4,
};

const getCurrentLogLevel = () => {
  const envLevel = process.env.LOG_LEVEL?.toUpperCase();
  return LOG_LEVELS[envLevel] || LOG_LEVELS[config.cli.defaultLogLevel];
};

const shouldLog = (level) => {
  return getCurrentLogLevel() <= LOG_LEVELS[level];
};

export const logger = {
  step: (current, total, message) => {
    if (shouldLog('INFO')) {
      console.log(`[${current}/${total}] ${message}`);
    }
  },
  done: (message) => {
    if (shouldLog('SUCCESS')) {
      console.log(chalk.green(`✓ ${message}`));
    }
  },
  error: (message, error) => {
    if (shouldLog('ERROR')) {
      console.error(chalk.red(`✗ ${message}`));
      if (error) {
        console.error(error);
      }
    }
  },
  warn: (message) => {
    if (shouldLog('WARN')) {
      console.warn(chalk.yellow(`! ${message}`));
    }
  },
  info: (message) => {
    if (shouldLog('INFO')) {
      console.log(`› ${message}`);
    }
  },
  debug: (message) => {
    if (shouldLog('DEBUG')) {
      console.log(chalk.gray(`⋮ ${message}`));
    }
  }
};
