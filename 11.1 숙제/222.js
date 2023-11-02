const fs = require('fs');
const path = require('path');

function createDirectoryTree(directoryPath, tree, prefix, isLast = true) {
  const items = fs.readdirSync(directoryPath);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);
    const isDirectory = stats.isDirectory();
    
    let line = prefix;
    line += isLast ? '└── ' : '├── ';
    line += item;

    tree.push(line);

    if (isDirectory) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      createDirectoryTree(itemPath, tree, newPrefix, i === items.length - 1);
    }
  }
}

const directoryPath = '.'; // 원하는 디렉토리 경로를 지정하세요
const tree = [];
createDirectoryTree(directoryPath, tree, '');

console.log(`디렉토리 트리 구조 (${directoryPath}):`);
console.log(tree.join('\n'));
