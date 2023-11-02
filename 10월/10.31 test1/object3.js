// const today = Date();
// //= const today = new Date();

// console.log(today);

//1. Date
const today = new Date();
console.log(today);

//2. Math
const number = Math.max(10, 20, 30, 5, 3, 1);
console.log(number);

const numbers = [-10, -20, -30, -5, -3, -1, -40]
// for (numbers){}

function max_numbers(nums){
    let num = nums[0];
    for (let i =1; i<nums.length; i++){
        if (nums[i] > num){
            num = nums[i];
            console.log(num);
        }
        
    }
    return num;
}
console.log('---')
max_num = max_numbers(numbers);
console.log('---')
console.log(max_num);

//3. string

const text = 'Hello, World';
console.log(text, text.length);
console.log(text, text.toUpperCase()); // 수정: toUpperCase()를 사용
console.log(text, text.toLowerCase()); // 수정: toLowerCase()를 사용

// const text = 'Hello, World';
// console.log(text, text.length);
// console.log(text, toUppercase());
// console.log(text, toLowerCase());