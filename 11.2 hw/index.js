// 이전 파일 내용 불러오기

import GenericCalculator from './calculator.js';

import readline from 'readline';

const r1 = readline.createInterface({ 
    input : process.stdin,
    output : process.stdout,
});

r1.question('계산기 종류 선택해라:', '1. 공학용 계산기', '2. ' ,(input) => {
    const num = parseInt(input);
    if(num === 1){
        console.log('2');
    } else {
        console.log('숫자로 입력해라');
    }
    r1.close(); 
});



// import{add, sub, mul, div} from './calculator.js';
// let sum = add(5, 3);
// console.log('덧셈결과:', sum);

