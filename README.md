# 🚀 gc - AI-Powered Git Commit Message Generator

## Overview

[`gc`](https://gc-cli.vercel.app) is an intelligent CLI tool that revolutionizes your Git commit workflow by generating meaningful, descriptive commit messages using AI technology.

## Features

- **AI-Powered Commit Messages**: Automatically generate contextually relevant commit descriptions
- **Clipboard Integration**: Easily copy commit messages
- **Flexible Commit Options**: 
  - Select from multiple AI-generated suggestions
  - Custom message writing
  - Direct repository commit
- **Privacy Controls**: Opt-in/out of anonymous data collection
- **User-Friendly Interface**: Simple, intuitive commands

## 🛠 Installation
   
```bash
npm install -g gc 
```

## Commands

### 1. Generate Commit Message
```bash
gc new
```
- Generates AI-powered commit message suggestions
- Interactive selection process
- Options to rewrite, accept, or copy to clipboard


### 2. Custom Commit Message
```bash
gc new -c
```
- Write your own commit message directly

### 3. Data Collection Preferences
```bash
gc opt-in # Enable anonymous usage data collection
gc opt-out # Disable anonymous usage data collection
```

### 4. Help
```bash
gc --help
```
- Display comprehensive help information

## Requirements

- Node.js 18.0.0 or higher
- Git installed on your system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`gc new`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

**Made with ❤️ by @utsavdotdev**