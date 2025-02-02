# React Native Style Cleaner 🧹

A tool to detect and clean unused styles in your React Native projects.

[![npm version](https://img.shields.io/npm/v/react-native-style-cleaner.svg)](https://www.npmjs.com/package/react-native-style-cleaner)
[![npm downloads](https://img.shields.io/npm/dm/react-native-style-cleaner.svg)](https://www.npmjs.com/package/react-native-style-cleaner)
[![License](https://img.shields.io/npm/l/react-native-style-cleaner.svg)](https://github.com/muhammeddeniz/react-native-style-cleaner/blob/master/LICENSE)

## Features ✨

- Detects unused StyleSheet styles in your React Native project
- Scans all JavaScript/TypeScript files (`.js`, `.jsx`, `.ts`, `.tsx`)
- Automatically removes unused styles
- Supports array-style declarations
- Beautiful CLI output with detailed information
- TypeScript support
- Style usage statistics and analysis
- Duplicate style detection
- Style complexity analysis
- Performance impact analysis
- Interactive cleaning mode

## Available Commands 📋

| Command       | Description                               | Example                                      | Output                                     |
| ------------- | ----------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| `clean`       | Removes unused styles from your project   | `npx react-native-style-cleaner clean ./src` | List of removed styles                     |
| `analyze`     | Shows unused styles without removing them | `npx react-native-style-cleaner analyze`     | List of unused styles                      |
| `stats`       | Displays style usage statistics           | `npx react-native-style-cleaner stats`       | Usage counts, most/least used styles       |
| `duplicates`  | Finds duplicate style definitions         | `npx react-native-style-cleaner duplicates`  | List of duplicate styles with locations    |
| `complexity`  | Analyzes style complexity                 | `npx react-native-style-cleaner complexity`  | Complex styles that might need refactoring |
| `performance` | Checks performance impact of styles       | `npx react-native-style-cleaner performance` | Heavy styles with optimization suggestions |
| `interactive` | Clean styles with confirmation            | `npx react-native-style-cleaner interactive` | Interactive prompts for each style         |
| `help`        | Shows all available commands              | `npx react-native-style-cleaner help`        | List of all commands and usage             |

### Command Options

| Option      | Description              | Example                                               |
| ----------- | ------------------------ | ----------------------------------------------------- |
| `--dir`     | Specify custom directory | `npx react-native-style-cleaner clean --dir=./app`    |
| `--ignore`  | Ignore specific paths    | `npx react-native-style-cleaner clean --ignore=tests` |
| `--verbose` | Show detailed output     | `npx react-native-style-cleaner analyze --verbose`    |
| `--json`    | Output results as JSON   | `npx react-native-style-cleaner stats --json`         |

## Installation 📦

- Added TypeScript support
- Improved CLI output

## Common Use Cases 💡

1. **Project Cleanup**

   - Remove styles from refactored components
   - Clean up after large UI updates

2. **Performance Optimization**

   - Reduce StyleSheet object size
   - Remove unnecessary style calculations

3. **Code Maintenance**
   - Keep style definitions clean and relevant
   - Improve code readability

## Ignored Directories 🚫

By default, the following directories are ignored:

- node_modules
- build
- dist

## Best Practices 🌟

1. **Run Before Commits**

   - Clean unused styles before committing changes
   - Keep your style definitions lean

2. **Regular Maintenance**

   - Run periodically on large projects
   - Include in your cleanup scripts

3. **Backup First**
   - Always commit your changes before running the cleaner
   - Use version control to track style changes

## Contributing 🤝

Contributions, issues and feature requests are welcome!

## License 📝

This project is [ISC](LICENSE) licensed.

## Author ✍️

**Muhammed Deniz**

- Github: [@muhammeddeniz](https://github.com/muhammeddeniz)
- LinkedIn: [@muhammeddeniz](https://linkedin.com/in/muhammeddeniz)

## Show your support

Give a ⭐️ if this project helped you!

## Changelog 📝

### Version 1.2.1

- Added new analysis features:
  - `stats`: Style usage statistics
  - `duplicates`: Find duplicate styles
  - `complexity`: Style complexity analysis
  - `performance`: Performance impact analysis
  - `interactive`: Interactive cleaning mode
- Enhanced CLI with new commands
- Improved error handling and reporting
- Added detailed statistics output
- Added colorful CLI interface
