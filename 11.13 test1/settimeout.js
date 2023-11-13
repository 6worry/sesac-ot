function sayHello (){
    console.log('지연 콜백 함수')
}
console.log('지연 시작')
setTimeout(sayHello, 1000);
console.log('지연 끝')

