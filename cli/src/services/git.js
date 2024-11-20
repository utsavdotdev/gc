import simpleGit from 'simple-git';
import { logger } from '../utils/logger.js';

// Initialize git client
const git = simpleGit();

// Get staged changes diff
export const getStagedDiff = async () => {
  try {
    // run the git add . command if no files are staged
    const diff = await git.diff(['--cached']);
    
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
