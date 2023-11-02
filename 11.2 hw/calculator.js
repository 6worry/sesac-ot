class GenericCalculator{
    constructor(number, operator, sub_oper, memory){
        this.number = number;
        this.operator = operator;
        this.sub_oper = sub_oper;
        this.memory = memory;
    }

}

class EnginerringCalculator extends GenericCalculator{
    constructor(number, operator, sub_oper, memory, mod, func){
        super(number, operator, sub_oper, memory);
        this.mod = mod;
        this.func = func;
    }
}

class GraphCalculator extends GenericCalculator{
    constructor(number, operator, sub_oper, memory, mod, func, _x, _y){
        super(number, operator, sub_oper, memory);
        this.mod = mod;
        this.func = func;
        this._x = _x;
        this._y = -y;

    }
}

class ProgrammerCalculator extends GenericCalculator{
    constructor(number, operator, sub_oper, memory, hex, dec, oct, bin, beat, beat_shift){
        super(number, operator, sub_oper, memory);
        this.hex = hex;
        this.dec = dec;
        this.oct = oct;
        this.bin = bin;
        this.beat = beat;
        this.beat_shift = beat_shift;
    }
}

export function add(a, b){
    return a+b;
}

export function sub(a, b){
    return a-b;
}

export function mul(a, b){
    return a*b;
}

export function div(a, b){
    return a/b;
}

// module.exports = node.js 초기방식
//ES6버전부터 import/export 기능 생김
