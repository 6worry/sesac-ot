import {readFileSync} from 'fs';
import {v4 as uuidv4} from 'uuid';

export function generateID(){
    return uuidv4;
};

export function readDataID(csvfile){
    const csvData = readFileSync(csvfile, 'utf-8', (err) => {
        if (err) {
        console.error('읽기오류!:', err);
        }
    });
    const IdData = csvData.split('\n');// 배열로 분할
    IdData.shift(); // csv 첫번째 요소 제거 (csv 헤더인 ID 항목 제거)
    const readId = IdData.map(IdData => IdData.split(",")[0]); // ,로 분할 후 첫번째 열 추출
    return readId;
}

export function getDataID(dataid){
    return dataid[Math.floor(Math.random()*dataid.length)];

}

export function generateDate() {
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    let day = (Math.floor(Math.random() * 31) + 1).toString().padStart(2, '0');
    
    if (month === '04' || month === '06' || month === '09' || month === '11') {
        day = (Math.floor(Math.random() * 30) + 1).toString().padStart(2, '0');
    } else if (month ==='02'){
        day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
    } else{
        day = (Math.floor(Math.random() * 31) + 1).toString().padStart(2, '0');
    };
    return `${month}.${day}`;
};

export function generateitemType() {
    const product = ['아메리카노', '카페라떼', '카페모카', '에스프레소', '토피넛라떼', '카라멜 마끼아또', '민트모카', '딸기에이드', '히비스커스', '캐모마일', '얼그레이', '생과일주스', '프라푸치노', '레몬에이드', '당근케잌', '초코케잌', '크로플', '소금빵', '초코머핀', '프레즐'];
    let product_type = ['COFFEE', 'ADE', 'CAKE', 'BREAD', 'TEA'];

    const selectedProduct = product[Math.floor(Math.random() * product.length)];

    if (['아메리카노', '카페라떼', '카페모카', '민트모카', '에스프레소', '카라멜 마끼아또', '토피넛라떼'].includes(selectedProduct)) {
        product_type = ['COFFEE'];
    } else if (['프라푸치노', '딸기에이드', '생과일주스', '레몬에이드'].includes(selectedProduct)) {
        product_type = ['ADE'];
    } else if (['얼그레이', '히비스커스', '캐모마일'].includes(selectedProduct)) {
        product_type = ['TEA'];
    } else if (['당근케잌', '초코케잌'].includes(selectedProduct)) {
        product_type = ['CAKE'];
    } else if (['프레즐', '크로플', '소금빵', '초코머핀'].includes(selectedProduct)) {
        product_type = ['BREAD'];
    };

    const itemPrice = generateitemPrice(selectedProduct);  //선택된 제품에 해당하는 가격 반환

    return `${selectedProduct}, ${product_type[0]}, ${itemPrice}`;
};

function generateitemPrice(product) {
    const productPrices = {
        '아메리카노': '3000₩',
        '소금빵': '3000₩',
        '프레즐': '3000₩',
        '카페라떼': '3500₩',
        '카페모카': '3500₩',
        '에스프레소': '3500₩',
        '토피넛라떼': '4000₩',
        '카라멜 마끼아또': '4000₩',
        '민트모카': '4000₩',
        '크로플': '4000₩',
        '초코머핀': '4000₩',
        '얼그레이': '4500₩',
        '히비스커스': '4500₩',
        '캐모마일': '4500₩',
        '생과일주스': '5000₩',
        '딸기에이드': '5000₩',
        '레몬에이드': '5000₩',
        '프라푸치노': '5500₩',
        '당근케잌': '6000₩',
        '초코케잌': '6000₩'
    };

    return productPrices[product]; // 선택된 제품에 해당하는 가격 반환
};

export function generateCompany(){
    let company = ['스타벅스', '할리스', '이디야', '빽다방', '메가커피'];
    let company2 = ['스타벅스', '할리스', '이디야', '빽다방', '메가커피'];
    let area = ['금천', '부평','해운대', '세종시청', '전주'];
    let selectArea = area[Math.floor(Math.random()*area.length)];
    const area_num = Math.floor(Math.random()*4)+1;
    const selectCompany =company[Math.floor(Math.random()* company.length)];

    if(['스타벅스'].includes(selectCompany)){
        company2 = ['스타벅스']
    }else if(['할리스'].includes(selectCompany)){
        company2 = ['할리스']
    }else if(['이디야'].includes(selectCompany)){
        company2 = ['이디야']
    }else if(['빽다방'].includes(selectCompany)){
        company2 = ['빽다방']
    }else if(['메가커피'].includes(selectCompany)){
        company2 = ['메가커피']
    };

    const realArea = generateAddress(selectArea);
    const street_name = ['자바구', '새싹구', '코드구', '지구', '웹구'];
    const street_num1 = Math.floor(Math.random()*100)+1;
    const street_num2 = Math.floor(Math.random()*100)+1;

    return `${selectCompany} ${selectArea}${area_num}${'호점'}, ${company2[0]}, ${realArea} ${street_name[Math.floor(Math.random()*street_name.length)]} ${street_num1}${'길'} ${street_num2}`;   
};

function generateAddress(area){
    const addressArea ={
        '금천': '서울',
        '부평': '인천',
        '해운대': '부산',
        '세종시청': '세종',
        '전주': '전주',
    };

    return addressArea[area]; 
};