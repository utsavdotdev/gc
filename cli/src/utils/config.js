export const config = {
  "ai": {
    "model": "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "temperature": 0.7,
    "maxSuggestions": 3,
    "prompts": {
      "system": "You are an AI assistant generating git commit messages in JSON format following the Conventional Commits standard. Use the structure {commit: '(type)(scope): (message)'}, e.g., {commit: 'feat(cli): add new command'}. Messages must be concise, scope optional (one word max). Display only JSON object of commit message",
      "user": "Strictly Generate 3 different commit messages in JSON object for the following git diff:\n{diff} "
    }
  },
  "git": {
    "defaultBranch": "main",
    "commitTemplate": "{type}{scope}: {message}",
    "conventionalCommitTypes": [
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "perf",
      "test",
      "build",
      "ci",
      "chore"
    ]
  },
  "cli": {
    "defaultLogLevel": "INFO",
    "colors": {
      "primary": "#36BCF7",
      "success": "#2ECC71",
      "error": "#E74C3C",
      "warning": "#F1C40F"
    }
  },
  "data-collection": false
};