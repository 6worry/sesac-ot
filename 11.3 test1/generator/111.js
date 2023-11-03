const names = ['John', 'JIN', 'michael', 'Jajo', 'soleil'];

function generateName(){
    return names[Math.floor(Math.random()* names.length)];
}
console.log(generateName());

function generateBirthName(){
    const year = Math.floor(Math.random() * 100)+1921;
    const month = Math.floor(Math.random() * 12)+1; // +1 한건 0~11 출력 값을 1~12로 출력하게끔 숫자 올림
    const day = Math.floor(Math.random() * 31)+1;

    return `${year}-${month}-${day}`
}
console.log(generateBirthName());

function generateGender(){

};

function generateaddress(){

};