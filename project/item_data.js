import fs from 'fs';
import {generateID} from './sub_data.js';

//ID

export function itemID(){
    return generateID();
};

//상품 이름

function itemName(){
    const product = ['아메리카노', '카페라떼', '카페모카', '에스프레소', '토피넛라떼', '카라멜 마끼아또', '민트모카', '딸기에이드', '히비스커스', '캐모마일', '얼그레이', '생과일주스', '프라푸치노', '당근케잌', '초코케잌', '크로플', '소금빵', '초코머핀', '프레즐'];
    return `${product[Math.floor(Math.random()*product.length)]}`;
};

//상품 종류

 function itemType(){
    const product_type = ['COFFEE', 'ADE', 'CAKE', 'BREAD', 'TEA'];
    return `${product_type[Math.floor(Math.random()*product_type.length)]}`;
};

//상품 가격

function itemprice(){
    const product_price = ['3000₩', '5000', '4000', '4500', '3500', '5500', '6000'];
    return `${product_price[Math.floor(Math.random()*product_price.length)]}`;
};

//상품 데이터

function itemResult(){
    const ItemID = itemID(); 
const result = `${ItemID()}, ${itemName()}, ${itemType()}, ${itemprice()}`;
return `${result}`;
};

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv';
};

console.log('ID, 상품이름, 상품종류, 상품가격');

const csvData = ['ID, 상품이름, 상품종류, 상품가격'];

for (let i=0; i<dataRecords;i++){
    const itemdata = itemResult();
    console.log(itemdata);
    csvData.push(itemdata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('store.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: item.csv');
    }
});

//상품 이름에 따라 종류, 가격 맞추기