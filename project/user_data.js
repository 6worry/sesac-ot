import fs from 'fs';
//ID
import {v4 as uuidv4} from 'uuid';
const generateID = uuidv4();

// function generateID() {
//     return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(code) {
//         // /[x]g - g플래그 = 글로벌 플래그로 전체 문자열을 검색하여 모든 일치 항목을 찾도록 지시함, g 플래그를 사용하지 않으면, 첫 번째 일치 항목만 찾음
//       const code_number = Math.floor(Math.random() * 16);
//       const random_code = code === 'x' ? code_number : code_number;
//       return random_code.toString(16);
//     });
//   };

//이름

function generateName(){
    const firstname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const secondname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const thirdname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    return `${firstname[Math.floor(Math.random()*firstname.length) ]}${secondname[Math.floor(Math.random()*secondname.length)]}${thirdname[Math.floor(Math.random()*thirdname.length)]}`;
};

//성별

function generateGender(){
    const gender = ['남', '여'];
    return gender[Math.floor(Math.random()*gender.length)];
};

//20세~50세

function genderateAge(){
    const age = Math.floor(Math.random()*31)+20;
    return `${age}`;
};

//1974년~2004년

function genderateBirthdate(){
    const year = Math.floor(Math.random()*31)+1974;
    const month = Math.floor(Math.random()*12)+1;
    const day = Math.floor(Math.random()*28)+1;
    return `${year}.${month}.${day}`;
};

//주소

function generateAddress(){
    const street_name1 = ['서울', '인천', '부산', '세종', '전주', ];
    const street_name2 = ['자바구', '새싹구', '코드구', '지구', '웹구'];
    const street_num1 = Math.floor(Math.random()*100)+1;
    const street_num2 = Math.floor(Math.random()*100)+1;
    return `${street_name1[Math.floor(Math.random()* street_name1.length)]} ${street_name2[Math.floor(Math.random()*street_name2.length)]} ${street_num1}${'길'} ${street_num2}`;
};

//사용자 데이터

function generateResult(){
const result = `${generateID}, ${generateName()}, ${generateGender()}, ${genderateAge()}, ${genderateBirthdate()}, ${generateAddress()}`;
return `${result}`;
};

//랜덤 데이터 생성
let numRecords = 1000;
let displayformat = process.argv[2];

if(process.argv.length<3){
    displayformat ='csv';
}

console.log('ID, 이름, 성별, 나이, 생년월일, 주소');

for (let i=0; i<numRecords;i++){
    console.log(generateResult());
}

const csvData = ['ID, 이름, 성별, 나이, 생년월일, 주소'];

const csvString = csvData.join('\n');

fs.writeFileSync('user.csv', csvString, 'utf-8');
  console.log('CSV 파일이 생성되었습니다: user.csv');


//시간 나면 사람 이름 답게 만들기, 도시에 따라 지역구 다르게 설정하기!