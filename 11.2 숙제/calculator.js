export default class GenericCalculator{
    constructor(number, operator, sub_oper, memory){
        this.number = number;
        this.operator = operator;
        this.sub_oper = sub_oper;
        this.memory = memory;
    }
    static add(a, b){
        return a + b;
    }

    static sub(a, b){
        return a - b;
    }

    static mul(a, b){
        return a * b;
    }

    static div(a, b){
        return a / b;
    }

    static plus(){
        console.log('+')
    }

    static minus(){
        console.log('-')
    }

    static multi(){
        console.log('x')
    }
    static divide(){
        console.log('/')
    }

    static calculate(a, operator, b){
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if(b===0){
                    console.log('0은 못나눠');
                    return null;
                }
                return a / b;                
        }
    }
}

// export function add(a, b){
//     return a+b;
// }

// export function sub(a, b){
//     return a-b;
// }

// export function mul(a, b){
//     return a*b;
// }

// export function div(a, b){
//     return a/b;
// }

// module.exports = node.js 초기방식
//ES6버전부터 import/export 기능 생김
