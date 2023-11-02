function divide(a, b){
    try {
        if(typeof b !== 'number'){
            throw new TypeError('숫자입력');
        }
        //길이제한코드추가
        a_str = a.toString();
        a_str_length = a_str.length;
        // console.log(a_str_length);

        if(a_str_length   //'number'.length  //입력 문자열 길이 확인
             >9){
            throw new RangeError('10자 이상은 입력 못해');
        }

        if (b===0){
            throw new Error('0은 안돼');
        }
        return a/b;
    } catch(error){
        if (error instanceof TypeError){
            console.log('타입오류', error.message);
        } else{
            console.log('기타오류', error.message);
        }
    }
}

console.log(divide(10, 2));
console.log(divide(10, "문자열"));
console.log(divide(10, 0));
console.log(divide(12345, 5));
console.log(divide(1234567890, 5));

