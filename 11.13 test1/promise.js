const { resolve } = require("path");

const myPromise = new Promise((resolve, reject)=> {
    //비동기 작업 수행
    //완료시 resolve() 호출
    //실패시 reject() 호츌
})

// Promise 호출 사용

myPromise
    .then((result) =>{
        //성공 했을때
    })
    .catch((error)=>{
        //실패 했을때
    })

    function asyncTask(){
        return new Promise((resolve, reject) =>{

            setTimeout(() =>{
                const random = Math.random();
                if (random >= 0.5){
                    resolve('완료')
                }else{
                    reject('작업실패')
                }
            }, 1000);
        });
    }

    asyncTask()
        .then((result)=> {
            console.log('성공:', result)
        })
        .catch((error)=>{
            console.log('실패:', error)

        })