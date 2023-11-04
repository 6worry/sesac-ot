function perfromAsyncTask(callback){
    setTimeout(() =>{
        const randomNumber = Math.random();
        if(randomNumber >= 0.5){
            callback(null, '작업완료')
        } else{
            callback('notnull', '작업실패')
        }
        
    }, 1000);
}

// 작업 호출
function myJob(){
perfromAsyncTask((error, result) =>{
    if(error){
        console.log('실패', result);
    } else{
        console.log('성공', result);
    }
});
}

for(let i=0;i<10;i++){
    myJob();
}