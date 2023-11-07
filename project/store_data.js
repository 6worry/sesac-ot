import fs from 'fs';
import {generateID} from './sub_data.js';

//ID

export function storeID(){
    return generateID();
};

//가게명

function storeName(){
    const company = ['스타벅스', '할리스', '이디야', '빽다방', '메가커피'];
    const area = ['금천', '부평','해운대', '세종시청', '전주'];
    const area_num = Math.floor(Math.random()*4)+1;
    return `${company[Math.floor(Math.random()*company.length)]} ${area[Math.floor(Math.random()*company.length)]}${area_num}${'호점'}`;
};

//가맹업체

 function storeType(){
    const company = ['스타벅스', '할리스', '이디야', '빽다방', '메가커피'];
    return `${company[Math.floor(Math.random()*company.length)]}`;
};

//가게주소

function storeAddress(){
    const street_name1 = ['서울', '인천', '부산', '세종', '전주', ];
    const street_name2 = ['자바구', '새싹구', '코드구', '지구', '웹구'];
    const street_num1 = Math.floor(Math.random()*100)+1;
    const street_num2 = Math.floor(Math.random()*100)+1;
    return `${street_name1[Math.floor(Math.random()* street_name1.length)]} ${street_name2[Math.floor(Math.random()*street_name2.length)]} ${street_num1}${'길'} ${street_num2}`;
};

//상점 데이터

function storeResult(){
    const StoreID = storeID(); 
const result = `${StoreID()}, ${storeName()}, ${storeType()}, ${storeAddress()}`;
return `${result}`;
};

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv'; // 추후 csv 뿐만 아니라 다른 파일들도 생성 할 수도 있을거 같아 내버려둠
};

console.log('ID, 가게명, 가맹업체, 가게주소');

const csvData = ['ID, 가게명, 가맹업체, 가게주소'];

for (let i=0; i<dataRecords;i++){
    const storedata = storeResult();
    console.log(storedata);
    csvData.push(storedata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('store.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: store.csv');
    }
});

// 가게명이랑 가맹업체 서로 맞추기, 가게 가맹점과 도시 및 지역구 서로 맞추기