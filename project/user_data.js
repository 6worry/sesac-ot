function generateID(){
    const firstid = [];
    const secondid = [];
    const thirdid = [];
    const fourthid = [];
    const fivethid = [];
    return `${firstid}-${secondid}-${thirdid}-${fourthid}-${fivethid}`
}

function generateName(){
    const firstname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const secondname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const thirdname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    return `${firstname[Math.floor(Math.random()*firstname.length) ]}${secondname[Math.floor(Math.random()*secondname.length)]}${thirdname[Math.floor(Math.random()*thirdname.length)]}`
};

function generateGender(){
    const gender = ['남', '여'];
    return gender[Math.floor(Math.random()*gender.length)];
}

//20세~50세

function genderateAge(){
    const age = Math.floor(Math.random()*31)+20;
    return `${age}`
}

//1974년~2004년

function genderateBirthdate(){
    const year = Math.floor(Math.random()*31)+1974;
    const month = Math.floor(Math.random()*12)+1;
    const day = Math.floor(Math.random()*28)+1;
    return `${year}.${month}.${day}`;
}

function generateAddress(){
    const street_name1 = ['서울', '인천', '부산', '세종', '전주', ];
    const street_name2 = ['자바구', '새싹구', '코드구', '지구', '웹구'];
    const street_num1 = Math.floor(Math.random()*100)+1;
    const street_num2 = Math.floor(Math.random()*100)+1;
    return `${street_name1[Math.floor(Math.random()* street_name1.length)]} ${street_name2[Math.floor(Math.random()*street_name2.length)]} ${street_num1}${'길'} ${street_num2}`
}
function generateResult(){
const result = generateResult(generateName(),',', generateGender(),',', genderateAge(),',', genderateBirthdate(),',',generateAddress());
return `${result}`
}

// function generateResult(count){
//     let result = [];
//     for (let i = 0; i < count; i++) {
//         result.push(generateName(),',', generateGender(),',', genderateAge(),',', genderateBirthdate(),',',generateAddress())
//     }
//     return result;
// }
// const result = generateResult(count);
// console.log(result);

let numRecords = result.argv[2];
let displayformat = result.argv[3];
// console.log(numRecords);

if(result.argv.length<3){
    numRecords = 10;
    displayformat ='csv';
}

for (let i=0; i<numRecords;i++){
    console.log(i);
}
console.log('ID, 이름, 성별, 나이, 생년월일, 주소');
console.log(generateResult());
// console.log(generateName(),',', generateGender(),',', genderateAge(),',', genderateBirthdate(),',',generateAddress());