// const path = require('path');
import path from 'path';

const filePath = path.join('/6worry/git-test/11.2 test1', 'file.txt');
console.log('파일 경로', filePath);

const extName = path.extname(filePath);
console.log('파일 확장자', extName);

const dirName = path.dirname(filePath);
console.log('파일이 속한 디렉토리', dirName);

const baseName = path.basename(filePath);
console.log('파일명', baseName);