// console.log(process.argv); 
// argv[0] = node 프로세스 위치
// argv[1] = 내 실행파일 의미함
// argv[2] = 실제 입력받은 인자
let numRecords = process.argv[2];
let displayformat = process.argv[3];
// console.log(numRecords);

if(process.argv.length<3){
    numRecords = 10;
    displayformat ='csv';
}

for (let i=0; i<numRecords;i++){
    console.log(i);
}

// if(displayformat =='csv'){
//     console.log('printing result to csv ...');
// } else if (displayformat == 'html'){
//     console.log('printing result to <html> ...');
// } else{
//     console.log('printing result to screen ...');
    
// }
