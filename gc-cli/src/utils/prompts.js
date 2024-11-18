import inquirer from 'inquirer';
import { config } from '../utils/config.js';

const formatCommitType = async (message) => {
  const { type } = await inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Select commit type:',
    choices: config.git.conventionalCommitTypes
  }]);

  const { scope } = await inquirer.prompt([{
    type: 'input',
    name: 'scope',
    message: 'Enter scope (optional):',
  }]);

  return config.git.commitTemplate
    .replace('{type}', type)
    .replace('{scope}', scope ? scope : '')
    .replace('{message}', message);
};

export const selectCommitMessage = async (messages) => {
  const { selection } = await inquirer.prompt([{
    type: 'list',
    name: 'selection',
    message: 'Select a commit message:',
    choices: [
      ...messages.map((msg, index) => ({
        name: `${index + 1}. ${msg}`,
        value: msg,
        short: msg.substring(0, 50) + '...'
      })),
      {
        name: 'None of these (write my own)',
        value: 'custom'
      }
    ],
    pageSize: 10
  }]);

  if (selection === 'custom') {
    const { customMessage } = await inquirer.prompt([{
      type: 'input',
      name: 'customMessage',
      message: 'Enter your commit message:',
      validate: input => input.length > 0 || 'Commit message cannot be empty'
    }]);
    return await formatCommitType(customMessage);
  }

  return selection;
};

export const selectCommitAction = async () => {
  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: 'Commit changes', value: 'commit' },
      { name: 'Copy to clipboard', value: 'copy' },
      { name: 'Edit message', value: 'edit' },
      { name: 'Cancel', value: 'cancel' }
    ]
  }]);

  return action;
};

export const editCommitMessage = async (originalMessage) => {
  const { editedMessage } = await inquirer.prompt([{
    type: 'editor',
    name: 'editedMessage',
    message: 'Edit your commit message:',
    default: originalMessage,
    waitUserInput: false
  }]);

  return editedMessage.trim();
};
