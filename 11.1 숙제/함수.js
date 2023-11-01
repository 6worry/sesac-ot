const number = [4, 2, 7, 1, 9, 5];

function Sort_number(num){

    for(let i=0; i<num.length; i++){
        for(let j=i+1; j<num.length; j++){
            if(num[i]>num[j]){
            let num1 = num[i];
            num[i] = num[j];
            num[j] = num1;
            // console.log(num1);
            } 
        }
    } return num;
}
sort = Sort_number(number);
console.log(sort);

