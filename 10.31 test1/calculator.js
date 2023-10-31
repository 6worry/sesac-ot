//예외처리를 할 수 있는 exception
// 모던 언어들에서는 try..catch (try..except)

function divide(a, b){
    let result;
    try{
        if(b===0){
            throw "0은 안돼"
        }  
        result = a / b;//오류가 발생할 소지가 있는 구문
    }catch(e){
        console.log('오류 발생');//오류를 핸들링 하기 위한 표현
    } return result;
}

console.log(divide(10, 0));

// try{
//     const result = myvariable *2;
// }catch(error){
//     console.log("오류");
// }



// function divide(a, b){
//     if(b===0){
//         return '0은 나눌 수 없다.'
//     }
//     return a/b;
// }
