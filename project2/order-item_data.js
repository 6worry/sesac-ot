import fs from 'fs';
import {v4 as uuid} from 'uuid';
import {readDataID, getDataID} from './sub_data.js';

// //ID

function orderitemID(){
    return uuid();
};

// 주문ID

let orderIDlist = readDataID('./order.csv')
function equlorderID(orderid){
    return getDataID(orderid)
}

//상품ID

let itemIDlist = readDataID('./item.csv')
function equlitemID(itemid){
    return getDataID(itemid)
}

//주문 상품 데이터

function orderitemResult(){
    const result = `${orderitemID()}, ${equlorderID(orderIDlist)}, ${equlitemID(itemIDlist)}`;
    return `${result}`;
};

//랜덤 데이터 생성

console.log('ID, 주문ID, 상품ID');

const csvData = ['ID, 주문ID, 상품ID'];

for (let i=0; i<50000;i++){
    const orderitemdata = orderitemResult();
    console.log(orderitemdata);
    csvData.push(orderitemdata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('order-item.csv', csvString, 'utf-8', (err) => {
    if (err) {
    console.error('오류!오류!:', err);
    } else {
    console.log('CSV 생성 완료: order-item.csv');
    };
});