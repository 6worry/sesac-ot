class Person{
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet(){
        console.log(`안녕 나는 ${this.name}이야. ${this.age}살 `);
    }

    walk(){
        console.log(`${this.name} walking`);
    }

    eat(){
        console.log(`${this.name} eatting`);
    }

}
const Person1 = new Person('철수', 25, '남')
Person1.greet();
Person1.walk();
Person1.eat();


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

const Employee1 = new Employee('영희', 30, '여', '매니저', 50000);
Employee1.greet();
Employee1.displayInfo();
Employee1.walk();
Employee1.work();

class people{
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

class Manager extends People{
    constructor (name, age, gender, jobTitle, salary){
    super(name, age, gender);
    this.jobTitle = jobTitle;
    this.salary = salary;  
    }
}

function introduce(people){
    for(const person of people){
        person.greet();
    }

    for (let i= 0; i<people.length;i++){
        people[i].greet();
    }
}

const people = [manager, empolyee1, employee2, empolyee3]

introduce(people);