import fs from 'fs';
import {v4 as uuid} from 'uuid';
import {readDataID, getDataID, generateDate} from './sub_data.js';
// //ID

export function orderID(){
    return uuid();
};

//주문일자

function orderDate() {
    const hour = (Math.floor(Math.random() * 24)).toString().padStart(2, 0);
    const min = (Math.floor(Math.random() * 60)).toString().padStart(2, 0);
    const sec = (Math.floor(Math.random() * 60)).toString().padStart(2, 0);

    return `${'2023'}.${generateDate()} ${hour}:${min}:${sec}`;
};

//가게ID


let storeIDlist = readDataID('./store.csv')
function equlstoreID(storeid){
    return getDataID(storeid)
}

//사용자ID

let userIDlist = readDataID('./user.csv')
function equluserID(userid){
    return getDataID(userid)
}

//주문 데이터

function orderResult(){
    const result = `${orderID()}, ${orderDate()}, ${equlstoreID(storeIDlist)}, ${equluserID(userIDlist)}`;
    return `${result}`;
};

//랜덤 데이터 생성

console.log('ID, 주문일자, 가게ID, 사용자ID');

const csvData = ['ID, 주문일자, 가게ID, 사용자ID'];

for (let i=0; i<10000;i++){
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
    };
});