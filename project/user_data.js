import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import {generateID} from './sub_data.js';

//ID

export function userID(){
    const UserID =generateID();
    return {UserID};
};

//이름

function userName(){
    const firstname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const secondname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const thirdname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    return `${firstname[Math.floor(Math.random()*firstname.length) ]}${secondname[Math.floor(Math.random()*secondname.length)]}${thirdname[Math.floor(Math.random()*thirdname.length)]}`;
};

//성별

function userGender(){
    const gender = ['남', '여'];
    return gender[Math.floor(Math.random()*gender.length)];
};

//20세~50세

function userAge(){
    const age = Math.floor(Math.random()*31)+20;
    return `${age}`;
};

//1974년~2004년

function userBirthdate() {
    const year = Math.floor(Math.random() * 31) + 1974;
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, 0);
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, 0);
    return `${year}.${month}.${day}`;
}

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
const result = `${userID()}, ${userName()}, ${userGender()}, ${userAge()}, ${userBirthdate()}, ${userAddress()}`;
return `${result}`;
};

//랜덤 데이터 생성

let dataRecords = process.argv[2];
let displayformat = process.argv[3];

if(process.argv.length<4){
    displayformat ='csv';
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

//시간 나면 사람 이름 답게 만들기, 도시에 따라 지역구 다르게 설정하기!
// 월마다 최대 날짜 설정하기