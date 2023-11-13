function asyncFunc1(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('함수1 clear')
            resolve('결과1')
        }, 1000);
    });
};

function asyncFunc2(){
    return new Promise((reslove, reject)=> {
        setTimeout(()=>{
            console.log('함수2 clear')
            reslove('결과2')
        }, 1000);
    });
};

// 콜백헬을 promise의 요청하여 
asyncFunc1()
    .then(response1 =>asyncFunc2(response1))
    .then(response2 =>asyncFunc1(response2))
    .then(response3 =>asyncFunc2(response3))
    .then(response4 =>{
        console.log('최종결과:', response4);
    })
    .catch(err=>{
        console.error('오류!', err)
    })