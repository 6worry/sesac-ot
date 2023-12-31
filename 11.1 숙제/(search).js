const array = Array.from({length:10}, () => Math.floor(Math.random() * 10));

// 이 참수는 배열을 받아서, 찾고자 하는 인덱스가 몇번째 있는지 반환
// 인덱스의 출발 = 1부터 출발
function linearSearch(arr, target) {
    for (let i=0; i<array.length; i++){
        if(arr[i] === target){
            return i+1; // 찾는 요소의 인덱스 반환
        }
    }
    return -1; //요소를 찾지 못한 경우 = -1을 반환
}


console.log(array);
console.time('linerSearch');
console.log(linearSearch(array, 5));
console.timeEnd('linerSearch');