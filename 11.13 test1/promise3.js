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

async function executeOperations(){ // async/await 구문이 동작하기 위해서는 무조건 함수여야 한다.
    try{
        const response1 = await asyncFunc1();
        const response2 = await asyncFunc2(response1);
        const response3 = await asyncFunc1(response2);
        const response4 = await asyncFunc2(response3);

        console.log('최종결과', response4);
    } catch(err){
        console.log('오류 발생', err)
    }
}

executeOperations();