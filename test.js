import { StyleCleaner } from "./src/index.js";

async function test() {
  const cleaner = new StyleCleaner("./src");

  console.log("Starting analysis...");

  // Find unused styles first
  const unusedStyles = await cleaner.analyze();
  console.log("\nUnused styles:");
  console.log("------------------------");
  unusedStyles.forEach((style) => {
    console.log(`- ${style.styleName} (${style.filePath})`);
  });

  // Clean unused styles
  console.log("\nCleaning unused styles...");
  const cleanedStyles = await cleaner.clean();
  console.log("\nCleaned styles:");
  console.log("------------------");
  cleanedStyles.forEach((style) => {
    console.log(`- ${style.styleName} (${style.filePath})`);
  });
}

test().catch(console.error);
