function externalAPI(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const result = Math.random() >=0.8;
            if(result){
                resolve('결과들어옴');
            }else{
                reject('결과 없음');
            }
        }, 2000); // 실제 네트워크 응답등 시뮬레시션 하기 위한 값 (시간)
    });
};

async function waitForResult(retryCount =0){
    try{
        result = await externalAPI();
        console.log('결과도착:', result);
        return result;
    } catch(err){
        console.log(`결과 도착 실패: ${err}, 재시도 ${retryCount+1}`);
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(waitForResult(retryCount+1))
            }, 2000); // 재시도 할 때 까지 대기하는 값 (시간)
        });
    };
};

waitForResult()
    .then((finalresult)=>{
        console.log('최종결과:', finalresult);
});