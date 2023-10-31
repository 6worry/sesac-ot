// const text = '현재 시간은 새벽 4시';
// const dot = text.split(' ');
// console.log(dot);

// const text2 = '자야 하는데 ...';
// const res = text2.indexOf(' ');
// console.log(res);

const number = [11, 12, 13, 14, 15];

function max_number(num){
    let num1 = num[0];
    for (let i=0; i<num.length; i++){
        if(num[i] > num1){
            num1 = num[i]
            console.log(num1);
        }
    } return num1;
}
max_num1 = max_number(number);
console.log(max_num1);