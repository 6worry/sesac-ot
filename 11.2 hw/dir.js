import fs from 'fs'; //내장함수
import path from 'path'; // 경로+파일

function DirTree(dirPath, prefix = '--') {
  const items = fs.readdirSync(dirPath);
  const files = [];
  const directories = [];

  for (const item of items) { // items의 배열 반복
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) { // isDirectory() = 해당 파일이 디렉토리인지 참 거짓으로 여부 확인
      directories.push(item);
    } else {
      files.push(item);
    };
  };

  const tree = [];

  for (let i = 0; i < directories.length; i++) {
    const isLast = i === directories.length - 1 && files.length === 0; // isLast = 현재 반복이 마지막 요소인지 나타내는 변수
    const directory = directories[i];
    const Prefix2 = prefix + (isLast ? '    ' : '│   ');
    tree.push(prefix + (isLast ? '└── ' : '├── ') + directory);
    const subTree = DirTree(path.join(dirPath, directory), Prefix2);
    tree.push(...subTree); //전개 연산자
  };

  for (let i = 0; i < files.length; i++) {
    const isLast = i === files.length - 1;
    tree.push(prefix + (isLast ? '└── ' : '├── ') + files[i]); // A ? B : C = A가 참이면 B, 그렇지 않으면 C 반환
  };

  return tree;
}

const dirpath = '.'; 
const tree = DirTree(dirpath, ''); // '' = 가장 왼쪽열에 문자 추가 가능

console.log(tree.join('\n'));