import fs from "fs";
import path from "path";
import * as parser from "@babel/parser";
import _traverse from "@babel/traverse";
import glob from "glob";
import generate from "@babel/generator";
import chalk from "chalk";

// Get the default export from @babel/traverse correctly
const traverse = _traverse.default;

class StyleCleaner {
  constructor(srcPath) {
    // Get absolute path
    this.srcPath = path.resolve(process.cwd(), srcPath);
    this.usedStyles = new Set();
    this.definedStyles = new Map();
    this.totalFiles = 0;
    this.styleUsageCount = new Map(); // Her stilin kaç kez kullanıldığını takip eder
  }

  getTotalFiles() {
    return this.totalFiles;
  }

  async analyze() {
    const pattern = path.join(this.srcPath, "**/*.{js,jsx,tsx,ts}");
    const files = glob.sync(pattern, {
      ignore: ["**/node_modules/**", "**/build/**", "**/dist/**"],
    });

    this.totalFiles = files.length;
    console.log(chalk.dim(`\n📁 Scanning ${files.length} files...\n`));

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, "utf-8");
        this.parseFile(content, file);
      } catch (error) {
        console.error(`Failed to read file: ${file}`, error);
      }
    }

    return this.findUnusedStyles();
  }

  parseFile(content, filePath) {
    try {
      const ast = parser.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "typescript", "decorators-legacy"],
      });

      traverse(ast, {
        CallExpression: (path) => {
          if (
            path.node.callee.type === "MemberExpression" &&
            path.node.callee.object?.name === "StyleSheet" &&
            path.node.callee.property?.name === "create"
          ) {
            const styles = path.node.arguments[0]?.properties || [];
            styles.forEach((style) => {
              if (style.key && style.key.name) {
                this.definedStyles.set(style.key.name, {
                  filePath,
                  used: false,
                });
              }
            });
          }
        },

        MemberExpression: (path) => {
          if (path.node.object?.name === "styles" && path.node.property?.name) {
            this.usedStyles.add(path.node.property.name);
          }
        },

        JSXAttribute: (path) => {
          // Check for style={[styles.something]} case
          if (
            path.node.name.name === "style" &&
            path.node.value?.expression?.elements
          ) {
            path.node.value.expression.elements.forEach((element) => {
              if (
                element.type === "MemberExpression" &&
                element.object?.name === "styles" &&
                element.property?.name
              ) {
                this.usedStyles.add(element.property.name);
              }
            });
          }
        },
      });
    } catch (error) {
      console.error(`Error: Failed to parse file ${filePath}:`, error);
    }
  }

  findUnusedStyles() {
    const unusedStyles = [];

    this.definedStyles.forEach((value, styleName) => {
      if (!this.usedStyles.has(styleName)) {
        unusedStyles.push({
          styleName,
          filePath: value.filePath,
        });
      }
    });

    return unusedStyles;
  }

  async clean() {
    const unusedStyles = await this.analyze();

    for (const { styleName, filePath } of unusedStyles) {
      const content = fs.readFileSync(filePath, "utf-8");
      // Remove style definition
      const updatedContent = this.removeStyleDefinition(content, styleName);
      fs.writeFileSync(filePath, updatedContent);
    }

    return unusedStyles;
  }

  removeStyleDefinition(content, styleName) {
    try {
      const ast = parser.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });

      traverse(ast, {
        ObjectProperty(path) {
          if (
            path.node.key.name === styleName &&
            path.parent &&
            path.parent.type === "ObjectExpression" &&
            path.parentPath.parent &&
            path.parentPath.parent.type === "CallExpression" &&
            path.parentPath.parent.callee &&
            path.parentPath.parent.callee.type === "MemberExpression" &&
            path.parentPath.parent.callee.object &&
            path.parentPath.parent.callee.object.name === "StyleSheet" &&
            path.parentPath.parent.callee.property &&
            path.parentPath.parent.callee.property.name === "create"
          ) {
            path.remove();
          }
        },
      });

      // Convert AST back to code
      const output = generate.default(ast);
      return output.code;
    } catch (error) {
      console.error(`Error removing style ${styleName}:`, error);
      return content;
    }
  }

  analyzeUsageStatistics() {
    const stats = {
      mostUsed: [],
      leastUsed: [],
      unusedCount: 0,
      totalStyles: this.definedStyles.size,
      totalUsages: 0,
    };

    // İstatistikleri hesapla
    return stats;
  }

  findDuplicateStyles() {
    const duplicates = new Map();
    const styleValues = new Map();

    this.definedStyles.forEach((value, styleName) => {
      const styleContent = JSON.stringify(value.style);
      if (styleValues.has(styleContent)) {
        // Aynı içeriğe sahip stiller bulundu
        const existing = styleValues.get(styleContent);
        duplicates.set(styleName, {
          duplicate: existing,
          filePath: value.filePath,
        });
      } else {
        styleValues.set(styleContent, styleName);
      }
    });

    return duplicates;
  }

  analyzeStyleComplexity() {
    const complexStyles = [];

    this.definedStyles.forEach((value, styleName) => {
      const complexity = this.calculateStyleComplexity(value.style);
      if (complexity > COMPLEXITY_THRESHOLD) {
        complexStyles.push({
          styleName,
          complexity,
          filePath: value.filePath,
        });
      }
    });

    return complexStyles;
  }

  suggestStyleMigrations() {
    // Yaygın kullanılan stilleri ortak bir dosyaya taşıma önerileri
    const suggestions = [];
    const commonStyles = this.findCommonStyles();

    // Öneriler oluştur
    return suggestions;
  }

  async cleanInteractive() {
    const unusedStyles = await this.analyze();

    for (const style of unusedStyles) {
      const answer = await this.promptUser(
        `Remove unused style "${style.styleName}" in ${style.filePath}? (y/n)`
      );

      if (answer.toLowerCase() === "y") {
        await this.removeStyle(style);
      }
    }
  }

  backupStyles(filePath) {
    const backup = {
      timestamp: new Date(),
      styles: {},
      filePath,
    };

    // Stilleri yedekle
    return backup;
  }

  restoreStyles(backup) {
    // Yedekten geri yükle
  }

  analyzePerformanceImpact() {
    const heavyStyles = [];

    this.definedStyles.forEach((value, styleName) => {
      const impact = this.calculatePerformanceImpact(value.style);
      if (impact > PERFORMANCE_THRESHOLD) {
        heavyStyles.push({
          styleName,
          impact,
          suggestion: this.generateOptimizationSuggestion(value.style),
        });
      }
    });

    return heavyStyles;
  }
}

export { StyleCleaner };
