const fs = require('fs');
const path = require('path');

function createDirectoryTree(directoryPath, tree, prefix) {
  const items = fs.readdirSync(directoryPath);
  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      tree.push(prefix + '└── ' + item);
      createDirectoryTree(itemPath, tree, prefix + "");
    } else {
      tree.push(prefix + '├── '+ item);
    }
  }
}

const directoryPath = '.'; // 원하는 디렉토리 경로를 지정하세요
const tree = [];
createDirectoryTree(directoryPath, tree, '');

console.log(`디렉토리 트리 구조 (${directoryPath}):`);
console.log(tree.join('\n'));
