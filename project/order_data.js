import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

// //ID

export function orderID(){
    return uuidv4();
};

//주문일자

function orderDate() {
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, 0);
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, 0);
    const hour = (Math.floor(Math.random() * 24)).toString().padStart(2, 0);
    const min = (Math.floor(Math.random() * 60)).toString().padStart(2, 0);
    const sec = (Math.floor(Math.random() * 60)).toString().padStart(2, 0);
    return `${'2023'}-${month}-${day} ${hour}:${min}:${sec} `;
};

//가게ID

import {storeID} from './store_data.js';

function equlstoreID(){
    return storeID();
};

//사용자ID

import {userID} from './user_data.js';

function equluserID(){
    return userID();
};

//주문 데이터

function orderResult(){
    const EqulstoreID = equlstoreID();
    const EquluserID = equluserID();
    const result = `${orderID()}, ${orderDate()}, ${EqulstoreID()}, ${EquluserID()}`;
    return `${result}`;
    };

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv';
};

console.log('ID, 주문일자, 가게ID, 사용자ID');

const csvData = ['ID, 주문일자, 가게ID, 사용자ID'];

for (let i=0; i<dataRecords;i++){
    const orderdata = orderResult();
    console.log(orderdata);
    csvData.push(orderdata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('order.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: order.csv');
    }
});
