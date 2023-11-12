import fs from 'fs';
import {v4 as uuid} from 'uuid';
import {generateCompany} from './sub_data.js';

//ID

export function storeID(){
    return uuid();
};

//가게명 및 가맹업체, 주소

 function storeType(){
    return `${generateCompany()}`;
};

//상점 데이터

function storeResult(){
    const result = `${storeID()}, ${storeType()}`;
    return `${result}`;
};

//랜덤 데이터 생성

console.log('ID, 가게명, 가맹업체, 가게주소');

const csvData = ['ID, 가게명, 가맹업체, 가게주소'];

for (let i=0; i<100;i++){
    const storedata = storeResult();
    console.log(storedata);
    csvData.push(storedata); //csv에 데이터 심기
};

const realcsvData = csvData.join('\n');

fs.writeFile('store.csv', realcsvData, 'utf-8', (err) => {
    if (err) {
    console.error('오류!오류!:', err);
    } else {
    console.log('CSV 생성 완료: store.csv');
    };
});