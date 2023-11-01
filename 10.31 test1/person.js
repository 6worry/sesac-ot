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
const person = new Person('철수', 25, '남')
person.greet();
person.walk();
person.eat();

class People extends Person{
    constructor(name, age, gender){
    super(name, age, gender);
    }
}

class Employee extends People{
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

const employee = new Employee('영희', 30, '여', '매니저', 50000);
employee.greet();
employee.displayInfo();
employee.walk();
employee.work();



class Manager extends People{
    constructor (name, age, gender, jobTitle, pay, team){
    super(name, age, gender);
    this.jobTitle = jobTitle;
    this.pay = pay;
    this.team = team;  
    }
    greet(){
        console.log(`안녕 나는 ${this.name}이고 직위는 ${this.jobTitle}이야.`);
    }
    assignTasks(){
        console.log(`${this.team} 이거해. `);
    }
}

// Manager 객체 생성 및 활용
const manager = new Manager("영민", 35, "남성", "팀장", 60000, "개발팀");
manager.assignTasks(); // "영민 매니저가 팀에 업무를 배분하고 있습니다." 출력

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

// Student 객체 생성 및 활용
const student = new Student("지연", 20, "여성", "2023001", "컴퓨터 공학");
student.study(); // "지연 학생이 컴퓨터 공학을 공부하고 있습니다." 출력

class Customer extends Person{
    constructor(name, age, gender, order_number, order){
    super(name, age, gender);
    this.order_number = order_number;
    this.order = order;
    }

    placeOrder(){
        console.log(`${this.name}고객이 ${this.order}완료함.`);
    }

}

// Customer 객체 생성 및 활용
const customer = new Customer("태식", 30, "남성", "C1001", ["주문1", "주문2"]);
customer.placeOrder(); // "태식 고객이 주문을 완료했습니다." 출력

function introduce(people){
    for(const person of people){
        person.greet();
    }

    for (let i= 0; i<people.length;i++){
        people[i].greet();
    }
}

const manager1 = { greet: () => console.log("Hello, I'm the manager") };

const people = [manager, employee];

introduce(people);

// 아래 내용이 나오도록, Class 들 구현하기...