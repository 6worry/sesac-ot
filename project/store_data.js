import fs from 'fs';
import {generateID, generateCompany} from './sub_data.js';

//ID

export function storeID(){
    return generateID();
};

//가게명 및 가맹업체

 function storeType(){
    return `${generateCompany()}`;
};

//가게주소

// function storeAddress(){
//     return generateAddress();
// };

//상점 데이터

function storeResult(){
    const StoreID = storeID(); 
const result = `${StoreID()}, ${storeType()}`;
return `${result}`;
};

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv'; // 추후 csv 뿐만 아니라 다른 파일들도 생성 할 수도 있을거 같아 내버려둠
};

console.log('ID, 가게명, 가맹업체, 가게주소');

const csvData = ['ID, 가게명, 가맹업체, 가게주소'];

for (let i=0; i<dataRecords;i++){
    const storedata = storeResult();
    console.log(storedata);
    csvData.push(storedata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('store.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: store.csv');
    }
});

// 도시 및 지역구 서로 맞추기