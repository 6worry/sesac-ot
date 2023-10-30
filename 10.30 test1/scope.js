var result =10; //global scope

console.log('result:', result);
function add(a, b) {
    let result = a + b; // block scope
    // result = 20;
    console.log('result:', result);
    // console.log('res:', res);
    return result;
}
// console.log('res:', res);
// console.log('result:', result);

result = add (2, 5);
result = sub(result, 6);
result = mul(result, 2);
console.log('result:', result);