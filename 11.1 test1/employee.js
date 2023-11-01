const Person = require('./person');


class Employee extends Person{
    constructor(name, age, gender, jobTitle, salary){
        super(name, age, gender);
        this.jobTitle = jobTitle;
        this.salary = salary;
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

}

module.exports = Employee;