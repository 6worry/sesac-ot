const Person = require('./person');

class Student extends Person{
    constructor(name, age, gender, number1, study1){
        super(name, age, gender);
        this.number1 = number1;
        this.study1 = study1;
    }

    displayInfo(){
        console.log(`직원${this.name}의 직위는 ${this.jobTitle}이고 급여는 ${this.salary}이다.`);
    }

    work(){
        console.log(`${this.name} working`);
    }

    greet(){
        console.log(`안녕 나는 ${this.name}이고 직위는 ${this.jobTitle}이야. `);
    }

    number(){
        console.log(`안녕 나는 ${this.number1}이야.`);
    }   

    study(){
        console.log(`나는 ${this.study1} 이야.`);
    }

}

module.exports = Student;