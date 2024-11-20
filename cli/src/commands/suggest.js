import { getStagedDiff } from "../services/git.js";
import { generateCommitMessages } from "../services/ai.js";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const handleSuggestCommand = async (options) => {
  if (options.generate) {
    try {
      const diff = await getStagedDiff();
      const suggestions = await generateCommitMessages(diff);

      const suggestionsPath = path.join(
        os.homedir(),
        ".gc-cli",
        "suggestions.json"
      );
      await fs.writeFile(suggestionsPath, JSON.stringify(suggestions));
    } catch (error) {
      // Silently fail for background generation
    }
  }
};
