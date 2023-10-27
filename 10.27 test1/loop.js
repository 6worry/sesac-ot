// for (시작값; 종료조건; 시작값의 증감조건) {

// }

// for (i=0; i<5;i++) {
//     // console.log("hello")
//     console.log(i)
//     for (k=0; k<5;k++) {
//         // console.log("hi")
//         console.log(k)
//     }
// }

// for (i=0; i<5;i++) {
//     // console.log("hello")
//     console.log("i=" +i)
//     for (k=0; k<5;k++) {
//         // console.log("hi")
//         console.log("k=" +k)
//     }
// }

for (let i=1; i<10;i++) {
    console.log("---" +i+"단" +"---")
    for (let j=1; j<10; j++) {
         let gugudan = i * j;
        console.log(i+ "x" + j + "=" + (i*j));
    }
}

//  while (조건문) {

//  }

let n=0;
while (n<10) {
    console.log(n);
    n= n+1;
}

n=0;
while (true) {
    console.log(n);
    n=n+1;
    if (n==10) {
        continue;
    } else if (n===20){
        break;
    }
}

// n=0;
// while (true) {
//     if (n==10) {
//        continue;
//     } else if (n===20){
//         break;
//     }
//     console.log(n);
//     n=n+1;
// }

n=0;
do {
    console.log(n)
    n=n+1;
} while (n<3);

console.log('b'+'a'+ +'a'+'a')