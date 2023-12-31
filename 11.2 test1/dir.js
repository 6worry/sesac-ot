// const fs = require('fs');
import fs from 'fs';
// const path = require('path');
import path from 'path';
import { pathToFileURL } from 'url';
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
        checkFileSync(filePath);
    })
});

function checkFile(filePath){
        fs.stat(filePath, (err, stats)=>{
            if (err){
                console.log('읽기 오류', err);
                return;
            }

            if (stats.isFile()){
                console.log('이것은 파일');
            } else if(stats.isDirectory()){
                console.log('이것은 디렉토리');
            } else{
                console.log('파일 및 디렉토리 X');
            }
        });
}

function checkFileSync(filePath){
    const stats = fs.statSync(filePath)
    
        if (stats.isFile()){
            console.log('이것은 파일');
        } else if(stats.isDirectory()){
            console.log('이것은 디렉토리');
        } else{
            console.log('파일 및 디렉토리 X');
        }
}