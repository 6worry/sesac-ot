import fs from 'fs';
import {v4 as uuid} from 'uuid';

// //ID

function orderitemID(){
    return uuid();
};

// 주문ID

import {orderID} from './order_data.js';

function equlorderID(){
    return orderID();
};

//상품ID

import {itemID} from './item_data.js';

function equlitemID(){
    return itemID();
};

//주문 상품 데이터

function orderitemResult(){
    const EqulorderID = equlorderID;
    const result = `${orderitemID()}, ${EqulorderID()}, ${equlitemID()}`;
    
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
