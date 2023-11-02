// const fs = require('fs');
import fs from 'fs';
// const path = require('path');
import path from 'path';
const directoryPath = "../";

fs.readdir(directoryPath, (err, files) => {
    if (err){
        console.log('읽기 오류', err);
        return;
    }
    console.log(files);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        console.log('파일', filePath);
    })
});