import clipboard from 'clipboardy';
import { logger } from '../utils/logger.js';

export const copyToClipboard = async (text) => {
  try {
    await clipboard.write(text);
    logger.done('Copied to clipboard');
    return true;
  } catch (error) {
    logger.error('Failed to copy to clipboard', error);
    return false;
  }
};

export const readFromClipboard = async () => {
  try {
    return await clipboard.read();
  } catch (error) {
    logger.error('Failed to read from clipboard', error);
    return null;
  }
};
