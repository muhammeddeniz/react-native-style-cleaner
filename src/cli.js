#!/usr/bin/env node

import { StyleCleaner } from "./index.js";
import chalk from "chalk";

const srcPath = process.argv[3] || "./src";
const command = process.argv[2];

function printHeader(text) {
  console.log(
    "\n" + chalk.bold.blue("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  );
  console.log(chalk.bold.white(text));
  console.log(chalk.bold.blue("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
}

function showHelp() {
  console.log(`
${chalk.bold("Usage:")} npx react-native-style-cleaner [command] [directory]

${chalk.bold("Commands:")}
  ${chalk.yellow("clean")}              Clean unused styles (default)
  ${chalk.yellow("analyze")}            Only analyze without cleaning
  ${chalk.yellow("stats")}              Show style usage statistics
  ${chalk.yellow("duplicates")}         Find duplicate styles
  ${chalk.yellow("complexity")}         Analyze style complexity
  ${chalk.yellow("performance")}        Check performance impact
  ${chalk.yellow("interactive")}        Clean styles in interactive mode

${chalk.bold("Examples:")}
  npx react-native-style-cleaner clean ./src
  npx react-native-style-cleaner stats
  npx react-native-style-cleaner duplicates
  `);
}

async function run() {
  const cleaner = new StyleCleaner(srcPath);

  try {
    switch (command) {
      case "stats":
        printHeader("📊 Style Usage Statistics");
        const stats = cleaner.analyzeUsageStatistics();
        console.log(chalk.cyan("Most used styles:"));
        stats.mostUsed.forEach((style) => {
          console.log(`${chalk.yellow(style.name)}: ${style.count} uses`);
        });
        console.log(`\nTotal styles: ${stats.totalStyles}`);
        console.log(`Total usages: ${stats.totalUsages}`);
        break;

      case "duplicates":
        printHeader("🔍 Duplicate Styles");
        const duplicates = cleaner.findDuplicateStyles();
        duplicates.forEach((info, styleName) => {
          console.log(
            chalk.yellow(`\n${styleName} is duplicate of ${info.duplicate}`)
          );
          console.log(chalk.dim(`in ${info.filePath}`));
        });
        break;

      case "complexity":
        printHeader("📈 Style Complexity Analysis");
        const complexStyles = cleaner.analyzeStyleComplexity();
        complexStyles.forEach((style) => {
          console.log(chalk.yellow(`\n${style.styleName}`));
          console.log(`Complexity score: ${style.complexity}`);
          console.log(chalk.dim(`in ${style.filePath}`));
        });
        break;

      case "performance":
        printHeader("⚡ Performance Impact Analysis");
        const heavyStyles = cleaner.analyzePerformanceImpact();
        heavyStyles.forEach((style) => {
          console.log(chalk.yellow(`\n${style.styleName}`));
          console.log(`Impact score: ${style.impact}`);
          console.log(chalk.cyan("Suggestion:"), style.suggestion);
        });
        break;

      case "interactive":
        printHeader("🤝 Interactive Cleaning Mode");
        await cleaner.cleanInteractive();
        break;

      case "analyze":
        printHeader("🔍 Style Analysis");
        const unusedStyles = await cleaner.analyze();
        if (unusedStyles.length === 0) {
          console.log(chalk.green("✨ No unused styles found!"));
        } else {
          console.log(
            chalk.yellow(`Found ${unusedStyles.length} unused styles:`)
          );
          unusedStyles.forEach((style) => {
            console.log(`\n${style.styleName}`);
            console.log(chalk.dim(`in ${style.filePath}`));
          });
        }
        break;

      case "help":
        showHelp();
        break;

      case "clean":
      default:
        if (command && command !== "clean") {
          console.log(chalk.red(`Unknown command: ${command}`));
          showHelp();
          process.exit(1);
        }

        printHeader("🧹 React Native Style Cleaner");
        const cleanedStyles = await cleaner.clean();
        console.log(
          chalk.green(`\n✨ Cleaned ${cleanedStyles.length} unused styles!`)
        );
        break;
    }
  } catch (error) {
    console.error(chalk.red("\n❌ An error occurred:"), error);
    process.exit(1);
  }
}

run();
