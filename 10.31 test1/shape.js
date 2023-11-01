class Shape{
    constructor(type){
        this.type = type;
    }

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
        this.radius = radius;
    }

    getArea(){
        return Math.PI *this.radius **2;
    }

    getInfo(){
        return `원, 반지름의 길이=${this.radius}`
    }
}

class Trapezium extends Shape{
    constructor(upperwidth, lowerwidth, height){
        super();
        this.upperwidth = upperwidth;
        this.lowerwidth = lowerwidth;
        this.height = height;
    }

    getArea(){
        return this.upperwidth * this.lowerwidth * this.height /2;
    }

    getInfo(){
        return `사다리꼴, 윗변의 길이=${this.upperwidth}, 밑변의 길이=${this.lowerwidth}, 높이=${this.height}`
    }    
}

const square = new Square(5);
const triangle = new Triangle(10, 8);
const circle = new Circle(7);
const trapezium = new Trapezium(9, 11, 15);
console.log('Square Area:', square.getArea());
console.log('Triangle Area:', triangle.getArea());
console.log('Circle Area:', circle.getArea());
console.log('Trapezium Area:', trapezium.getArea());
console.log('Square Info:', square.getInfo());
console.log('Triangle Info:', triangle.getInfo());
console.log('Circle Info:', circle.getInfo());
console.log('Trapezium Info:', trapezium.getInfo());
console.log('Square:', square.toString());
console.log('Triangle:', triangle.toString());
console.log('Circle:', circle.toString());
console.log('Trapezium:', trapezium.toString());
