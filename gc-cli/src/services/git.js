import simpleGit from 'simple-git';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

// Initialize git client
const git = simpleGit();

// Get staged changes diff
export const getStagedDiff = async () => {
  try {
    const diff = await simpleGit().diff(['--cached']);
    
    if (!diff.trim()) {
      throw new Error(
        'No staged changes found.\n' +
        'Please stage your changes first using:\n' +
        '  git add <file>    - to stage specific files\n' +
        '  git add .         - to stage all changes'
      );
    }
    
    return diff;
  } catch (error) {
    if (error.message.includes('No staged changes found')) {
      throw error; // Throw our custom error with helpful message
    }
    throw new Error(`Failed to get staged changes: ${error.message}`);
  }
};

// Commit changes with provided message
export const commitChanges = async (message) => {
  try {
    await git.commit(message);
    logger.done("Changes committed successfully");
    return true;
  } catch (error) {
    logger.error(`Commit failed: ${error.message}`);
    return false;
  }
};
