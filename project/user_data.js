import fs from 'fs';
import {generateID, generateDate} from './sub_data.js';

//ID
export function userID(){
    return generateID();
};

//이름

function userName(){
    const firstname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const secondname = ['영', '예', '상', '정', '유', '승', '다', '하', '지', '재'];
    const thirdname = ['준', '우', '진', '민', '순', '미', '은', '연', '현', '림'];
    return `${firstname[Math.floor(Math.random()*firstname.length) ]}${secondname[Math.floor(Math.random()*secondname.length)]}${thirdname[Math.floor(Math.random()*thirdname.length)]}`;
};

//성별

function userGender(){
    const gender = ['남', '여'];
    return gender[Math.floor(Math.random()*gender.length)];
};

//1974년~2004년, 20세~50세

function userBirthdate() {
    const age = Math.floor(Math.random()*31)+20;
    const today = new Date();
    const year = today.getFullYear() - age +1;
    return `${age}, ${year}.${generateDate()}`;
};

//사용자 주소

function userAddress(){
    const street_name1 = ['서울', '인천', '부산', '세종', '전주',];
    const street_name2 = ['자바구', '새싹구', '코드구', '지구', '웹구'];
    const street_num1 = Math.floor(Math.random()*100)+1;
    const street_num2 = Math.floor(Math.random()*100)+1;
    return `${street_name1[Math.floor(Math.random()* street_name1.length)]} ${street_name2[Math.floor(Math.random()*street_name2.length)]} ${street_num1}${'길'} ${street_num2}`;
};

//사용자 데이터

function userResult(){
    const UserID = userID();
const result = `${UserID()}, ${userName()}, ${userGender()}, ${userBirthdate()}, ${userAddress()}`;
return `${result}`;
};

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv'; // 추후 csv 뿐만 아니라 다른 파일들도 생성 할 수도 있을거 같아 내버려둠
};

console.log('ID, 이름, 성별, 나이, 생년월일, 주소');

const csvData = ['ID, 이름, 성별, 나이, 생년월일, 주소'];

for (let i=0; i<dataRecords;i++){
    const userdata = userResult();
    console.log(userdata);
    csvData.push(userdata); //csv에 데이터 심기
};

const csvString = csvData.join('\n');

fs.writeFile('user.csv', csvString, 'utf-8', (err) => {
if (err) {
    console.error('오류!오류!:', err);
} else {
    console.log('CSV 생성 완료: user.csv');
    }
});