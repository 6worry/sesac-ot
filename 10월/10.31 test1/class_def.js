// class declaration= 객체 선언 (정의)

class car{
    constructor(make, model) {
        this._make = make;
        this._model = model;
    }

    drive(){
        return `${this._make} ${this._model} 운전운전`
    }

    stop() {
        return `${this._make} ${this._model} 멈춤멈춤`
    }

}

// function tesla_driving(){
//     if (this.model){
//         return `$`
//     }
// }

const mycar = new car('kia', 'k3');
const yourcar = new car('tesla', 'model3');

console.log(mycar._make);
console.log(mycar.drive());
console.log(mycar.stop());
console.log(yourcar._make);
console.log(yourcar.drive());
console.log(yourcar.stop());
