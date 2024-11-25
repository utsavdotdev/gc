# gc - Git Commit Suggestion CLI
This is a CLI tool that helps you write better commit messages.

# Features
- [x] Generate the commit message(`gc new`)
- [x] Add the commit message to the clipboard
- [x] Display variance of the commit message
- [x] Directly push the commit to the remote repository
- [x] Display help for a command
- [x] Implement commands to let users choose whether to permit or deny data collection.

# Commands 

 - `gc new` - Generate the commit message
    - This shows the list of commit messages and ask you to select the best one.
    - There will be sub-options like rewrite, accept with directly commenting, accept with copy to clipboard and reject.
 - `gc help` - Display help for a command
 - `gc opt-in` - Permit data collection
 - `gc opt-out` - Deny data collection
