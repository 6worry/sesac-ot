class animal{
    constructor(name){
        this.name = name;
    }

    makesound(){
        return 'sound'
    }

}

class dog extends animal{
    makesound(){
        return '멍멍'
    }
}

const mydog = new dog('멍멍이');
console.log(mydog.makesound());