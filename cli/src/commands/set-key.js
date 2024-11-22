import { logger } from "../utils/logger.js";
import { updateApiKey } from "../utils/config.js";

const validateApiKey = (key) => {
  return /^gsk_[A-Za-z0-9-_]{32,}$/.test(key);
};

export const handleSetKeyCommand = async (apiKey) => {
  try {
    if (!validateApiKey(apiKey)) {
      logger.error(
        'Invalid Groq API key format. It should start with "gsk_" followed by at least 32 characters'
      );
      return false;
    }

    const success = await updateApiKey(apiKey);
    if (success) {
      logger.done("API key has been set successfully");
      return true;
    }
    return false;
  } catch (error) {
    logger.error("Failed to set API key", error);
    return false;
  }
};
