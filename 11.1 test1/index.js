const {add2, add3} = require('./add'); //인덱스 모듈에서 add모듈의 함수 불러옴

let sum = add2(3, 4);
console.log('결과:', sum);
sum = add3(3, 4, 5);
console.log('결과:', sum);

const Person = require('./person');

let person = new Person('철수', 25, '남')
console.log('greet', person);