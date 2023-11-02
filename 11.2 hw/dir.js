// import fs from 'fs'; //내장함수
// import path from 'path';


// fs.readdir(".", 'utf8', (err, file) =>{
//     if (err){
//         console.log('현재 디렉토리 오류', err);
//         return;
//     } console.log('현재 디렉토리의 파일목록:', file);
// });

import fs from 'fs'; //내장함수
import path from 'path';

function CreatedirTree(dirPath, prefix = '--') {
  const items = fs.readdirSync(dirPath);
  const files = [];
  const directories = [];

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
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
    const subTree = CreatedirTree(path.join(dirPath, directory), newPrefix);
    tree.push(...subTree);
  }

  for (let i = 0; i < files.length; i++) {
    const isLast = i === files.length - 1;
    tree.push(prefix + (isLast ? '└── ' : '├── ') + files[i]);
  }

  return tree;
}

const dirPath = '.'; // 원하는 디렉토리 경로를 지정하세요
const tree = CreatedirTree(dirPath, '');

console.log(`디렉토리 트리 구조 (${dirPath}):`);
console.log(tree.join('\n'));
