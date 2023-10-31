const car = class{
    constructor(make, model){
        this.make = make;
        this.model = model;
    }
        drive() {
            return `${this.make} ${this.model} is driving`
            
        }

        stop() {
            return `${this.make} ${this.model} is stopping`
            
        }
    
}

const mycar = new Car('kia', 'k3');
const yourcar = new Car('kia', 'k3');