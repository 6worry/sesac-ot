const Employee = require('./employee');
const Student = require('./student');

const empolyee = new Employee("영희", 20, '남', '매니저', '500');
const student = new Student("철수", 30, '남', 12345, "컴퓨터공학");

empolyee.greet();
empolyee.displayInfo();
empolyee.work();

student.greet();
student.study();