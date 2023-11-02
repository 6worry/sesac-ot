// const readline = require('readline');

import readline from 'readline';

import {v4 as uuid} from 'uuid';

const r1 = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

r1.question('구구단의 단을 입력해라:', (input) => {
    const num = parseInt(input);
    if(!isNaN(num) && num>0 && num <10){
        console.log(`${num} 단 구구단을 출력함`);
        
        for(let i=1; i<10; i++){
            console.log(`${num}*${i}=${num*i}`);
        }
        // 이 단의 구구단을 출력해라 3줄 이내
        
    } else {
        console.log('숫자를 입력해라');
    }
    r1.close();
});

const uuid2 = uuid();
console.log(uuid2);