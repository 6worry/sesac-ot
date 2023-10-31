const array = [1, 2, 3];

for (const element of array) {
    console.log(element); // for ... of = 배열, 문자열, map, set
}

const object = {a:1, b:2, c:3}

for(const key in object){
    console.log(key, object[key]); // for ... in = 객체
}

const fruits = ['apple', 'banana', 'orange'];

for (const fruit of fruits){
    // console.log(fruit, fruits[fruit]);
    console.log(fruit);
}