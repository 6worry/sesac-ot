// const fs = require('fs');
// const path = require('path');
import fs from 'fs';
import path from 'path';

function printTree(directoryPath, prefix = '') {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file, index) => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        const isLast = index === files.length - 1;

        console.log(`${prefix}${isLast ? '└──' : '├──'} ${file}`);

        if (isDirectory) {
            const prefixForNextLevel = `${prefix}${isLast ? '   ' : '│  '}`;
            printTree(filePath, prefixForNextLevel);
        }
    });
}

const directoryPath = "./"; // 입력받은 디렉토리

printTree(directoryPath);