import fs from 'fs';
import {generateID, generateitemType} from './sub_data.js';

//ID

export function itemID(){
    return generateID();
};

//상품 이름 및 종류, 가격

function itemName(){
    return generateitemType();
};

//상품 데이터

function itemResult(){
    const ItemID = itemID(); 
    const result = `${ItemID()}, ${itemName()}`;
    return `${result}`;
};

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv'; // 추후 csv 뿐만 아니라 다른 파일들도 생성 할 수도 있을거 같아 내버려둠
};

console.log('ID, 상품이름, 상품종류, 상품가격');

const csvData = ['ID, 상품이름, 상품종류, 상품가격'];

for (let i=0; i<dataRecords;i++){
    const itemdata = itemResult();
    console.log(itemdata);
    csvData.push(itemdata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('item.csv', csvString, 'utf-8', (err) => {
    if (err) {
    console.error('오류!오류!:', err);
    } else {
    console.log('CSV 생성 완료: item.csv');
    };
});