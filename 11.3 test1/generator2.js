class NameGenerator{
    constructor(){
        this.names = ['John', 'JIN', 'michael', 'Jajo', 'soleil'];
    }
    generateName(){
        return names[Math.floor(Math.random()* names.length)];
    }
};

class BirthdateGenerator{
    constructor(){
        this.startDate = '2000-01-01'
        this.endDate = '2023-12-31'
    }
    generateBirthName(){
        const year = Math.floor(Math.random() * 100)+1921;
        const month = Math.floor(Math.random() * 12)+1; // +1 한건 0~11 출력 값을 1~12로 출력하게끔 숫자 올림
        const day = Math.floor(Math.random() * 31)+1;
        return `${year}-${month}-${day}`
    }
};

const cities = ['서울', '런던', '워싱턴', '부산', '텍사스'];

console.log(generateName());

console.log(generateBirthName());

function generateGender(){
    const gender = ['Male', 'Femaie'];

//     if(Math.random()< 0.5){ // 0.5 = 비율, 조정 가능
        // return 'Male';
        // } else {
        // return 'Female';     
//     }

// return Math.random() < 0.5 ? "Male" : "Female"; 위의 if문을 한 줄로 정리 가능

    return gender[Math.floor(Math.random()*gender.length)];
};
console.log(generateGender());

function generateAddress(){

    // const city = [Math.floor(Math.random()*cities.length)];
    // const street = [Math.floor(Math.random()*100)+1];
    // return `${street} ${city}`


    const street_num = Math.floor(Math.random()*100)+1;
    const street_name = ['성동대로', '장한평대로', '새싹대로', '자바대로'];
    return `${street_num}-${street_num}, ${street_name[Math.floor(Math.random()*street_name.length)]}`
};
console.log(generateAddress());