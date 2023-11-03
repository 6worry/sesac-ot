function generateName(){
    const firstname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const secondname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    const thirdname = ['강', '박', '진', '최', '유', '이', '조', '정', '고', '맹'];
    return `${firstname[Math.floor(Math.random()*firstname.length) ]}${secondname[Math.floor(Math.random()*secondname.length)]}${thirdname[Math.floor(Math.random()*thirdname.length)]}`
};
console.log(generateName());