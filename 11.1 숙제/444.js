const fs = require('fs');
const path = require('path');

function createDirectoryTree(directoryPath, prefix) {
  const items = fs.readdirSync(directoryPath);
  const files = [];
  const directories = [];

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      directories.push(item);
    } else {
      files.push(item);
    }
  }

  const tree = [];

  for (let i = 0; i < directories.length; i++) {
    const isLast = i === directories.length - 1 && files.length === 0;
    const directory = directories[i];
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    tree.push(prefix + (isLast ? '└── ' : '├── ') + directory);
    const subTree = createDirectoryTree(path.join(directoryPath, directory), newPrefix);
    tree.push(...subTree);
  }

  for (let i = 0; i < files.length; i++) {
    const isLast = i === files.length - 1;
    tree.push(prefix + (isLast ? '└── ' : '├── ') + files[i]);
  }

  return tree;
}

const directoryPath = '.'; // 원하는 디렉토리 경로를 지정하세요
const tree = createDirectoryTree(directoryPath, '');

console.log(`디렉토리 트리 구조 (${directoryPath}):`);
console.log(tree.join('\n'));
