import fs from 'fs';
import {generateID, generateitemPrice, generateitemType} from './sub_data.js';

//ID

export function itemID(){
    return generateID();
};

//상품 이름 및 종류

function itemName(){
return `${generateitemType()}`
}

//상품 가격

function itemprice(){
    const productPrices = {
        '아메리카노': '3000₩',
        '소금빵': '3000₩',
        '프레즐': '3000₩',
        '카페라떼': '3500₩',
        '카페모카': '3500₩',
        '에스프레소': '3500₩',
        '토피넛라떼': '4000₩',
        '카라멜 마끼아또': '4000₩',
        '민트모카': '4000₩',
        '크로플': '4000₩',
        '초코머핀': '4000₩',
        '얼그레이': '4500₩',
        '히비스커스': '4500₩',
        '캐모마일': '4500₩',
        '생과일주스': '5000₩',
        '딸기에이드': '5000₩',
        '레몬에이드': '5000₩',
        '프라푸치노': '5500₩',
        '당근케잌': '6000₩',
        '초코케잌': '6000₩'
    };
    return `${generateitemPrice()}`
};

//상품 데이터

function itemResult(){
    const ItemID = itemID(); 
const result = `${ItemID()}, ${itemName()}, ${itemprice()}`;
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

fs.writeFile('store.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: item.csv');
    }
});

//상품 이름에 따라, 가격 맞추기