const number = [4, 2, 7, 1, 9, 5];//sort()함수

function Sort_number(num){
    for(let i=0; i<num.length; i++){
        for(let j=i+1; j<num.length; j++){
            if(num[i]>num[j]){
            let num1 = num[i];
            num[i] = num[j];
            num[j] = num1;
            } 
        }
    } return num;
}
sort = Sort_number(number);
console.log(sort);

const number1 = [4, 2, 7, 1, 9, 5]; //search(num)함수

function Search_number(num){
    for(let i=0; i<num.length; i++){
        if (num[i] === value){
            return value;
        } 
    } return 'nothing here :('
}
const value = 4
search = Search_number(number1, value);
console.log('검색한 값:', search);

const fs = require('fs'); //내장함수

fs.readdir(".", 'utf8', (err, file) =>{
    if (err){
        console.log('현재 디렉토리 오류', err);
        return;
    } console.log('현재 디렉토리의 파일목록:', file);
});
