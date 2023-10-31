class Shape{
    getArea() {
        return 0;
    }

    getInfo(){
        return '객체의 정보 입력'
    }

    toString(){
        return `${this.type} - Area: ${this.getArea()}`
    }


}

class Square extends Shape{
    constructor(sideLength){
        super('Square');
        this.sideLength = sideLength;
    }

    getArea(){
        return this.sideLength ** 2; //** =  제곱*/
    }

    getInfo(){
        return `정사각형, 변수의 길이= ${this.sideLength}`
    }

}

class Triangle extends Shape{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
    
    
    getArea(){
        return this.width * this.height /2;
    }

    getInfo(){
        return `삼각형, 밑변의 길이= ${this.width}, 높이의 길이= ${this.height}`
    }

}


class Circle extends Shape{
    constructor(radius){
        super();
        this.radius = this.radius;
    }

    getArea(){
        return Math.PI *this.radius **2;
    }
}

class Trapezium extends Shape{
    constructor(){

    }
}

const square = new Square(5);
const triangle = new Triangle(5);
const circle = new Circle(5);
const trapezium = new Trapezium(5);
console.log('Square Area:', square.getArea());
console.log('Triangle Area:', triangle.getArea());
console.log('Circle Area:', circle.getArea());
console.log('Trapezium Area:', trapezium.getArea());
console.log('Square Info:', square.getarea());
console.log('Triangle Info:', triangle.getarea());
console.log('Circle Info:', circle.getarea());
console.log('Square Info:', Square.getarea());
console.log('Square Info:', square.getarea());
console.log('Triangle Info:', triangle.getarea());
console.log('Circle Info:', circle.getarea());
console.log('Square Info:', Square.getarea());
