hello = 'hello';

var hello = 'hello';

let number = 1;
let number2 = 'hello';
let number3 = 3;
number3 = 'hello';

//객체(object)

let person3 = {name: 'alice', age:30, job:"engineer"};
let person = {name: 'alice', age:30, job:"engineer"};

let person2 = {
    name: 'alice',
    age: 30,
    job: "engineer"

};

console.log(person2);

//2. 객체 접근

console.log(person2.name);
console.log(person2.age);
console.log(person2.job);

//3. 속성 추가

person2.location = 'seoul';
console.log(person2);

//4. 속성 변경

person2.age = 31;
console.log(person2);

//5. 속성 삭제

delete person2.location;
console.log(person2);

//6. 객체 함수 추가

let car = {
    brand:"kia",
    year:20,
    start: function(){ // 함수도 추가 가능, 많이 사용됨!
        return "engine started"
    },
    stop: function(){
        return "engline stopped"
    }
};

console.log(car);
console.log(car.start());
console.log(car.stop());