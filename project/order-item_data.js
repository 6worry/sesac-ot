import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

// //ID

function orderitemID(){
    return uuidv4();
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
    const EqulitemID = equlitemID();
    const EqulorderID = equlorderID;
    const result = `${orderitemID()}, ${EqulorderID()}, ${EqulitemID()}`;
    return `${result}`;
    };

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv'; // 추후 csv 뿐만 아니라 다른 파일들도 생성 할 수도 있을거 같아 내버려둠
};

console.log('ID, 주문ID, 상품ID');

const csvData = ['ID, 주문ID, 상품ID'];

for (let i=0; i<dataRecords;i++){
    const orderitemdata = orderitemResult();
    console.log(orderitemdata);
    csvData.push(orderitemdata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('order.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: order-item.csv');
    }
});
