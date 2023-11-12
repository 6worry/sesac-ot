import fs from 'fs';
import {v4 as uuid} from 'uuid';
import {generateitemType} from './sub_data.js';

//ID

export function itemID(){
    return uuid();
};

//상품 이름 및 종류, 가격

function itemName(){
    return generateitemType();
};

//상품 데이터

function itemResult(){
    const result = `${itemID()}, ${itemName()}`;
    return `${result}`;
};

//랜덤 데이터 생성

console.log('ID, 상품이름, 상품종류, 상품가격');

const csvData = ['ID, 상품이름, 상품종류, 상품가격'];

for (let i=0; i<20;i++){
    const itemdata = itemResult();
    console.log(itemdata);
    csvData.push(itemdata); //csv에 데이터 심기
};

const realcsvData = csvData.join('\n');

fs.writeFile('item.csv', realcsvData, 'utf-8', (err) => {
    if (err) {
    console.error('오류!오류!:', err);
    } else {
    console.log('CSV 생성 완료: item.csv');
    };
});