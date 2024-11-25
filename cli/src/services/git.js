import simpleGit from "simple-git";
import { logger } from "../utils/logger.js";

// Initialize git client
const git = simpleGit();

// Get staged changes diff
export const getStagedDiff = async () => {
  try {
    const diff = await git.diff(['--cached']);
    if (!diff) {
      logger.warn(
        "No staged changes found.\n" +
        "Please stage your changes first using:\n" +
        "  git add <file>    - to stage specific files\n" +
        "  git add .         - to stage all changes"
      );
      process.exit(1);
    }
    // Split diff into separate files
    const files = diff.split('diff --git');
    
    // Filter out unnecessary files
    const filteredFiles = files.filter(file => {
      const skipPatterns = [
        'node_modules/',
        'package-lock.json',
        'yarn.lock',
        'dist/',
        'build/'
      ];
      return !skipPatterns.some(pattern => file.includes(pattern));
    });

    const formattedDiff = filteredFiles.length 
      ? 'diff --git' + filteredFiles.join('diff --git')
      : '';

    if (!formattedDiff.trim()) {
      throw new Error(
        "No staged changes found.\n" +
        "Please stage your changes first using:\n" +
        "  git add <file>    - to stage specific files\n" +
        "  git add .         - to stage all changes"
      );
    }

    return formattedDiff;
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
