function greet(name, callback){ //기본값으로 기능을 구현해두고 디테일은 신경안씀, 그냥 너가 불러준 함수 불러주겠다. = callback 함수
    const message = `Hi, ${name}`
    // console.log(message);
    callback(message);
}

function displaygreeting(greeting){
    // console.log(greeting);
    console.log(`<H1>${greeting}</H1>`);
}

greet('예제', displaygreeting);