function asyncFunc1(input){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const result = input+1;
            console.log(`함수1 clear input: ${input}, result: ${result}`)
            resolve(result)
        }, 1000);
    });
};

function asyncFunc2(input){
    return new Promise((reslove)=> {
        setTimeout(()=>{
            const result = input+2;
            console.log(`함수2 clear input:${input}, result:${result}`)
            reslove(result)
        }, 1000);
    });
};

async function executeOperations(){
    let input = 5;
    try{
        const response1 = await asyncFunc1(input);
        const response2 = await asyncFunc2(response1);
        const response3 = await asyncFunc1(response2);
        const response4 = await asyncFunc2(response3);
        
        console.log('최종결과:', response4);
    } catch(err){
        console.log('오류!오류!', err);
    }
}
executeOperations();