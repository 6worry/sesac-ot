// 배열(리스트) [mem1, mem2, mem3, ...]
//1. 배열 생성

const numbers = [1,2,3,4,5];
const numbers2 = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, '1', 'hello', true, false, null, {key: 'value'}];

console.log(numbers2);
console.log(fruits);
console.log(mixed);

//2. 배열 접근

console.log(numbers[0]); // 0부터 시작
console.log(numbers[1]);
console.log(numbers[4]);
console.log(numbers[5]); // 인덱스 범위를 벗어난 상태

for(let i=0; i<numbers.length; i++){
    console.log(numbers[i]);
}

for (let i= 0;
    i<fruits.length;
    i++) {
    console.log(fruits[i]);
}


//모던언어들의 특징: 직관적으로 접근 가능한 문법
//fruits.foreach(개별멤버별로 수행할 기능을 함수로 정의)
//익명함수 - 함수명이 없는 함수

fruits.forEach((fruit) => {
    console.log(fruit);
});

fruits.forEach(function(fruit){
    console.log(fruit);
});

//3. 배열 수정

console.log(fruits);

fruits[1]= 'grapes';
console.log(fruits);

fruits.push('tomato');
console.log(fruits);

new_fruits = fruits.pop();
console.log(new_fruits);
console.log(fruits);

const new_numbers = numbers.slice(1,3); // slice(index_start, index_end) 시작포함, 마지막 미포함!
console.log(new_numbers);

//숫자(number - integer, float)
//문자(string)
//불리언(boolean)=true, false
//객체(object) = {key:value}
//스페셜: null, undefined

let variable
console.log(variable);

variable = null;
console.log(variable);
variable = 1;
console.log(variable);
variable = null;
console.log(variable);
variable = undefined; // 좋지 않은 습관!
console.log(variable);
variable = 1;
console.log(variable);

variable = 1;
console.log(typeof(variable));
variable = "1";
console.log(typeof(variable));



