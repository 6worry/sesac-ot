const text1 = '현재 시간은 새벽 4시';
const dot = text1.split(' ');
console.log(dot);

const text2 = '자야 하는데 ...';
const res = text2.indexOf(' ');
console.log(res);

const text3 = '열공열공';
const char = text3.charAt(2);
console.log(char);

const text4 = '집가고싶다.';
console.log(text4.length);

const text5 = '현재 시간은 오후 2시 40분';
const substring = text5.substring(1, 10);
console.log(substring);

const text6 = '마이구미 맛없다.';
const new_text6 = text6.replace('맛없다', '맛있다');
console.log(new_text6);

const text7 = '배터리 100%';
const new_text7 = text7.concat(' ', '충전완료!');
console.log(new_text7);

const text8 = '구구단을 외자 ';
const new_text8 = text8.repeat(2);
console.log(new_text8);

const text9 = 'hello world';
console.log(text9.toUpperCase());

const text10 = 'hello world';
console.log(text10.toLowerCase());


const number = [11, 12, 13, 14, 15]; // MAX

function max_number(num){
    let num1 = num[0];
    for (let i=0; i<num.length; i++){
        if(num[i] > num1){
            num1 = num[i]
            // console.log(num1);
        }
    } return num1;
}
max_num = max_number(number);
console.log('최댓값:', max_num);

const number2 = [21, 22, 23, 24, 25];//MIN

function min_number(num){
    let num1 = num[0];
    for (let i=0; i<num.length; i++){
        if(num[i] < num1){
            num1 = num[i]
            // console.log(num1);
        }
    } return num1;
}
min_num = min_number(number2);
console.log('최소값:', min_num);

const number3 = [31, 32, 33, 34, 35];//AVG

function AVG_number(num){
    let sum = 0;
    for (let i=0; i<num.length; i++){
        sum+= num[i];
    } return sum / num.length;
}
avg = AVG_number(number3);
console.log('평균값:', avg);