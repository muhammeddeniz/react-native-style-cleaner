#!/usr/bin/env node

import { StyleCleaner } from "./index.js";
import chalk from "chalk";

const srcPath = process.argv[2] || "./src";

function printHeader(text) {
  console.log(
    "\n" + chalk.bold.blue("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  );
  console.log(chalk.bold.white(text));
  console.log(chalk.bold.blue("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
}

function printStyleInfo(styles) {
  styles.forEach((style, index) => {
    console.log(chalk.yellow(`${index + 1}. ${style.styleName}`));
    console.log(chalk.dim(`   📁 ${style.filePath}`));
  });
}

async function run() {
  try {
    printHeader("🧹 React Native Style Cleaner");

    console.log(chalk.cyan("📂 Scanned directory:"), chalk.white(srcPath));

    const cleaner = new StyleCleaner(srcPath);

    console.log(chalk.cyan("\n🔍 Analyzing..."));
    const unusedStyles = await cleaner.analyze();

    if (unusedStyles.length === 0) {
      console.log(chalk.green("\n✨ Great! No unused styles found."));
      return;
    }

    printHeader(`🗑️  Unused Styles (${unusedStyles.length})`);
    printStyleInfo(unusedStyles);

    const totalFiles = cleaner.getTotalFiles();
    console.log(chalk.dim(`\n📊 Total files scanned: ${totalFiles}`));

    console.log(chalk.cyan("\n🧹 Starting cleanup process..."));
    const cleanedStyles = await cleaner.clean();

    printHeader(`✅ Cleaned Styles (${cleanedStyles.length})`);
    printStyleInfo(cleanedStyles);

    console.log(chalk.green("\n✨ Process completed successfully!"));
  } catch (error) {
    console.error(chalk.red("\n❌ An error occurred:"), error);
    process.exit(1);
  }
}

run();
