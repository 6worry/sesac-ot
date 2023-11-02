class circle {
    constructor(radius){
        this._radius = radius;
    }

    get diameter(){
        return this._radius *2;
    }

    set diameter(diameter){
        this._radius = diameter /2;
    }
}

const mycircle = new circle(5);
console.log(mycircle.diameter);
mycircle.diameter = 50;
console.log(mycircle._radius);