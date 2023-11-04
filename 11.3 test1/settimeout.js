
console.log('시작');
setTimeout(sayhello, 2000); //1000 = 1초
console.log('함수호출후');

function sayhello(){
    console.log('안녕, 지금은 n시 n분이야.');
}

console.log('종료');

setTimeout(() => {
    console.log("비동기");
}, 1000);