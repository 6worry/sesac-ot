const fs = require('fs'); //내장함수
const path = require('path'); //내장함수


// function CreatedirTree(dirPath, prefix) {
//   const items = fs.readdirSync(dirPath);
//   const files = [];
//   const directories = [];

fs.readdir(DirPath, (err, items) =>{
    if (err){
        console.log('읽기 오류', err);
        return;
    } 
    const files = [];
    const directories = [];
    console.log(items);
})