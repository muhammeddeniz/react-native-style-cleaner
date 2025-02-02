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

    console.log(chalk.cyan("📂 Taranan dizin:"), chalk.white(srcPath));

    const cleaner = new StyleCleaner(srcPath);

    console.log(chalk.cyan("\n🔍 Analiz yapılıyor..."));
    const unusedStyles = await cleaner.analyze();

    if (unusedStyles.length === 0) {
      console.log(chalk.green("\n✨ Harika! Kullanılmayan stil bulunamadı."));
      return;
    }

    printHeader(`🗑️  Kullanılmayan Stiller (${unusedStyles.length})`);
    printStyleInfo(unusedStyles);

    const totalFiles = cleaner.getTotalFiles(); // Bu metodu index.js'e eklememiz gerekecek
    console.log(chalk.dim(`\n📊 Toplam taranan dosya: ${totalFiles}`));

    console.log(chalk.cyan("\n🧹 Temizleme işlemi başlıyor..."));
    const cleanedStyles = await cleaner.clean();

    printHeader(`✅ Temizlenen Stiller (${cleanedStyles.length})`);
    printStyleInfo(cleanedStyles);

    console.log(chalk.green("\n✨ İşlem başarıyla tamamlandı!"));
  } catch (error) {
    console.error(chalk.red("\n❌ Bir hata oluştu:"), error);
    process.exit(1);
  }
}

run();
