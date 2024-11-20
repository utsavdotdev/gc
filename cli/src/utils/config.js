export const config = {
    ai: {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxSuggestions: 3,
        prompts: {
        system: 'Generate clear, concise, and conventional git commit messages.',
        user: 'Generate {count} different commit messages for the following git diff:\n{diff}'
        }
    },

  git: {
    defaultBranch: 'main',
    commitTemplate: '{type}{scope}: {message}',
    conventionalCommitTypes: [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore'
    ]
  },

  cli: {
    defaultLogLevel: 'INFO',
    colors: {
      primary: '#36BCF7',
      success: '#2ECC71',
      error: '#E74C3C',
      warning: '#F1C40F'
    }
  }
};
