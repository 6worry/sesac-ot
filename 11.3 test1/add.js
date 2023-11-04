function add(a, b, callback){ // 너의 callback 함수를 통해서 하나의 인자값으로 결과 반환- 인자값 총 보유 개수 내에서 조절 가능
    const sum = a+b + '=';
    callback(a, b, sum);
}

function displayResult(a, b, result){
    console.log('Result:', a, b, result);
}

res = add(2, 5, displayResult);
// console.log(res);