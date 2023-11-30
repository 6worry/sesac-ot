function greet (name) {
    return `Hi ${name}님`;
};

const result = greet('6worry');

console.log(result);

const myfunctin = greet;

const result2 = myfunctin('6worry');

console.log(result2);