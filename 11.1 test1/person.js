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

module.exports = Person;