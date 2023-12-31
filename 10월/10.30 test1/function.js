// 함수 정의/선언 (declear)

function greet() {
    console.log("hi");
    console.log("오류");
}

// 함수 호출 = 실행

greet();

//매개변수(parameter)

function greetbyname(name) {
    console.log("hi, ", name);
    console.log("hi, ", name, " 님");
    console.log(`hi, ${name} 님`);
}

greetbyname("진영록");
greetbyname("김00");
greetbyname("이00");

function add(a, b){
    console.log({a, b});
    let sum = a + b;
    console.log(sum);
    return sum;
}

add(2, 3);
let sum = add(2, 5);
console.log(sum); 

function sub(a, b){
    console.log({a, b});
    let sum2 = a - b;
    console.log(sum2);
    return sum2;
}

sub(5, 2);
let sum2 = sub(5, 4);
console.log(sum2);

function mul(a, b){
    console.log({a, b});
    let sum3 = a * b;
    console.log(sum3);
    return sum3;
}

mul(5, 3);
let sum3= mul(6, 3);
console.log(sum3);

function div(a, b){
    console.log({a, b});
    // console.log(sum4);
    if(b===0){       
        console.log('0으로 나눌 수 없다.')
        return a/b;
    } else {
        let sum4 = a / b;
        return sum4;
    }
}

div(6, 0);
let sum4 = div(10, 2);
console.log(sum4);

//익명함수
//function 함수명 (파라1, 파라2, 파라3, ...)

let result2 = function(x, y){
    return x = y
};
console.log(result2(2, 5));

let result3 = function(x, y){
    return x = y
};
console.log(result3(2, 10));

add(1, 2);
let result5 = function(x, y){
    return x + y
};
console.log(result5(1, 2));

sub(10, 2);
let result6= function(x, y){
    return x - y
};
console.log(result6(10, 2));
//화살표 함수(arrow function) (function 키워드 없이 가능- 더 간소화 가능)

let result4 = (x, y) => {
    return x = y
};
console.log(result4(3, 5));

console.log(add(2, 3));
console.log(sub(2, 5));
console.log(mul(10, 100));
console.log(div(10,'100'));
console.log(add('10',100));
console.log(sub('100',10));
console.log(sub('100', null));
console.log(div('100', 0));
console.log(add(5, 5, 5, 5));

//부동소숫점의 오류

console.log(mul(BigInt(999999), BigInt(999999)));


