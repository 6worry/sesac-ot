const Person = require('./person');

class Student extends Person{
    constructor(name, age, gender, school_number, major){
    super(name, age, gender);
    this.school_number = school_number;
    this.major = major;
    }

    study(){
        console.log(`나는 ${this.major} 학과야. 공부 열심히 해야지..`);
    }

}

module.exports = Student;