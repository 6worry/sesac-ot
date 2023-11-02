let score = 80;

console.log('--- if ---')

if (score>=90){
    console.log("A");
}

else if (score>=80) {
    console.log("B");
}

 else if (score>=70) {
    console.log("C");
} else {console.log("F")}

console.log('--- switch ---')

switch(score) {
    case 90: //조건에 따라 jump하는 기능 //
        console.log("A");
        console.log("AA");
        break;
    case 80:
        console.log("B");
        console.log("BB");
        break;
    case 70:
        console.log("C");
        break;
    }

console.log('--- THE END ---')
