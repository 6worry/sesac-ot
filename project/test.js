import {v4 as uuidv4} from 'uuid'

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
    }

    const itemPrice = generateitemPrice(selectedProduct);
    return `${selectedProduct}, ${product_type[0]}, ${itemPrice}`;
}

export function generateitemPrice(selectedProduct) {
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

    return productPrices[selectedProduct] || '가격 정보 없음';
}
