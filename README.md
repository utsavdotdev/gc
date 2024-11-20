# gc - Git Commit Suggestion CLI
This is a CLI tool that helps you write better commit messages.

# Features
- [ ] Generate the commit message(`gc new`)
- [ ] Add the commit message to the clipboard
- [ ] Display variance of the commit message
- [ ] Directly push the commit to the remote repository
- [ ] Autocomplete the commit message using AI (git commit -m "...")

# Commands 

 - `gc new` - Generate the commit message
    - This shows the list of commit messages and ask you to select the best one.
    - There will be sub-options like rewrite, accept with directly commenting, accept with copy to clipboard and reject.
 - `gc help` - Display help for a command
 - `gc setup` - Setup the configuration for the auto-suggestion



# Workflow
There will be two way to use this tool 

1. First One, Through the terminal command `gc`
2. Second One is Automatically suggestion in terminal cli while writing 
```bash
git commit -m "suggestion of commit message"
```

> In the auto suggestion process, There will be keyboard shortcut to rewrite and accept the suggestion (like `ctrl + r` to rewrite and `Tab` to accept)