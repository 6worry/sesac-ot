const array = Array.from({length:100}, ()=> Math.floor(Math.random() * 100));

function selectionSort(arr){
    const length = arr.length;
    for(let i=0; i<length -1; i++){
        let minIndex = i;
        for(let j= i+1; j<length; j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j;
            }
        }

        if(minIndex !== i){
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

console.log('정렬전:', array);
console.time('selectionSort');
const sortedArray = selectionSort(array);
console.timeEnd('selectionSort');
console.log('정렬후:', sortedArray);