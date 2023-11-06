import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { generateID } from './sub_data.js';
import { storeID, STORE_ID } from './store_data.js';
import { userID, USER_ID } from './user_data.js';

function orderID() {
    return uuidv4();
}

function orderDate() {
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
    const hour = (Math.floor(Math.random() * 24)).toString().padStart(2, '0');
    const min = (Math.floor(Math.random() * 60)).toString().padStart(2, '0');
    const sec = (Math.floor(Math.random() * 60)).toString().padStart(2, '0');

    return `2023-${month}-${day} ${hour}:${min}:${sec}`;
}

const store_ID = storeID().StoreID;
const STORE_con_ID = STORE_ID[Math.floor(Math.random() * STORE_ID.length)];

const user_ID = userID().UserID;
const USER_con_ID = USER_ID[Math.floor(Math.random() * USER_ID.length)];

function orderResult() {
    const result = `${orderID()}, ${orderDate()}, ${STORE_con_ID}, ${USER_con_ID}`;
    return result;
}

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if (process.argv.length < 4) {
    displayformat = 'csv';
}

console.log('ID, 주문일자, 가게ID, 사용자ID');

const csvData = ['ID, 주문일자, 가게ID, 사용자ID'];

for (let i = 0; i < dataRecords; i++) {
    const orderdata = orderResult();
    console.log(orderdata);
    csvData.push(orderdata);
}

const csvString = csvData.join('\n');

fs.writeFile('order.csv', csvString, 'utf-8', (err) => {
    if (err) {
        console.error('오류!오류!:', err);
    } else {
        console.log('CSV 생성 완료: order.csv');
    }
});
