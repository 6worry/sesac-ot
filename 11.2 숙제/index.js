// 이전 파일 내용 불러오기

import GenericCalculator from './calculator.js';
import EnginerringCalculator from './engineer.js';
import GraphCalculator from './graph.js';
import ProgrammerCalculator from './programer.js';

import readline from 'readline';

const r1 = readline.createInterface({ 
    input : process.stdin,
    output : process.stdout,
});

console.log('보유중인 계산기:');
console.log('1. 공학용 계산기');
console.log('2. 기본 계산기');
console.log('3. 그래프 계산기');
console.log('4. 프로그래머 계산기');

r1.question('계산기 종류 선택해라 (1번/2번/3번/4번):' ,(input) => {
    const input_value = parseInt(input);
    
    if(input_value === 1 || input_value ===3 || input_value ===4){
        console.log('좋은 말로 할때 2번 골라라');
        r1.close();
    }
    else if (input_value === 2){
        r1.question('입력할 첫번째 숫자:' , (input) => { 
            const num1 = parseFloat(input);

            if(!isNaN(num1)){
            r1.question('입력할 연산자 [+, -, *, /]:', (input) => {
                const operator = input;

                if (operator === '+'|| operator === '-'|| operator === '*'|| operator === '/'){
                    r1.question('두번째 숫자 입력:', (input) => {
                        const num2 = parseFloat(input);
                        
                        if(!isNaN(num2)){
                            const result = GenericCalculator.calculate(num1, operator, num2);
                            console.log('계산 결과:', result);
                            r1.close();
                        } else{
                            console.log('숫자만 입력해!');
                            r1.close();
                            }
                    });
                } else{
                    console.log('가능한 연산자만 입력해');
                    r1.close();
                    }
            });
            } else {
                console.log('숫자만 입력해!!');
                r1.close();
                }
        });
    }
            else{
                console.log('숫자로 입력해라');
                r1.close();
            }  
});