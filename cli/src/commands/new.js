import { logger } from '../utils/logger.js';
import { generateCommitMessages } from '../services/ai.js';
import { getStagedDiff, commitChanges } from '../services/git.js';
import { selectCommitMessage, selectCommitAction, editCommitMessage, formatCommitType } from '../utils/prompts.js';
import { copyToClipboard } from '../services/clipboard.js';
import inquirer from 'inquirer';

// Process the selected action
const handleAction = async (message, action) => {
  switch (action) {
    case 'commit':
      return await commitChanges(message);
    case 'copy':
      return await copyToClipboard(message);
    case 'edit':
      logger.info('Opening editor');
      const editedMessage = await editCommitMessage(message);
      const newAction = await selectCommitAction();
      return await handleAction(editedMessage, newAction);
    case 'cancel':
      logger.warn('Operation cancelled');
      return false;
    default:
      return false;
  }
};

// Main command handler
export const handleNewCommand = async (options) => {
  try {
    // If custom flag is present, skip AI generation
    if (options.custom) {
      const { customMessage } = await inquirer.prompt([
        {
          type: "input",
          name: "customMessage",
          message: "Enter your commit message:",
          validate: (input) =>
            input.length > 0 || "Commit message cannot be empty",
        },
      ]);
      const structuredMessage = await formatCommitType(customMessage);
      const action = await selectCommitAction();
      return await handleAction(structuredMessage, action);
    }

    logger.step(1, 4, 'Checking staged changes');
    const diff = await getStagedDiff();
    console.log(diff);
    
    logger.step(2, 4, 'Generating commit suggestions');
    const messages = await generateCommitMessages(diff);
    logger.step(3, 4, 'Awaiting selection');
    const selectedMessage = await selectCommitMessage(messages);
    const action = await selectCommitAction();
    
    logger.step(4, 4, 'Processing action');
    await handleAction(selectedMessage, action);
    
  } catch (error) {
    logger.error('Failed to generate commit message', error);
    process.exit(1);
  }
};
