const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3005;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session ({
    secret: 'qwe123',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const users = [
    {id: 1, userid: 'user1', userpw: 'pw1'},
    {id: 2, userid: 'user2', userpw: 'pw2'}
];

const products = [
    { id: 1, name: 'Product1', price: 1000},
    { id: 2, name: 'Product2', price: 2000},
    { id: 3, name: 'Product3', price: 1700},
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'real.html'));
});

app.get('/products', (req, res) => {
    console.log('Session Info:', req.session);
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];

    console.log('Session Info:', req.sessionStore.sessions); res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.post('/login', (req, res) => {
    const { userid, userpw } = req.body;
    console.log(userid, userpw);

    const user = users.find((u) => 
        u.userid === userid
        && u.userpw === userpw
    );

    if (user) {
        console.log('로그인 성공');
        req.session.user = user;
        res.json({message: 'login success'});
    } else {
        console.log('로그인 실패');
        res.status(401).json({message: 'login fail'});
    };
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('삭제오류', err);
            res.status(500).json({message: '실패!'});
        } else {        
            console.log('로그아웃 성공');
            res.json({message: 'logout success'});
        };
    });
});

app.post('/add-to-cart/:productid', (req, res) => {
    const productid = parseInt(req.params.productid);
    const product = products.find((p) => p.id == productid);

    if (!product) {
        return res.status(404).json({message: '상품을 못찾겠어'});
    };

    const cart = req.session.cart || [];
    const item = cart.find((i) => i.id === product.id);
    
    if (item) {
        // 이미 있는 경우 수량만 증가
        item.quantity += 1;
        item.totalprice += product.price;
    } else {
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    });
    }
    req.session.cart = cart;
    res.json({message: '상품 추가함', cart});
});

app.post('/update-quantity/:productid', (req, res) => {
    const productid = parseInt(req.params.productid);
    const change = parseInt(req.query.change);
    const cart = req.session.cart;
    const item = cart.find((i) => i.id === productid);

    if (!item) {
        return res.status(404).json({message: '상품을 찾을 수 없음'})
    }

    item.quantity = Math.max(1, item.quantity + change); // 둘 중 큰값을 반환 (1이상 나오게 함)
    res.json({cart, updatedQuantity: item.quantity})
})

app.delete('/remove-from-cart/:productid', (req, res) => {
    const productid = parseInt(req.params.productid);
    const cart = req.session.cart
        const item = cart.findIndex((i) => i.id == productid);
        if (item !== -1) {
            // If the item is found, remove it from the cart
            cart.splice(item, 1);
        res.json({message: '상품 제거함', cart});
        }
})

app.listen(port, () => {
    console.log(`${port} 완완료`);
});

function calculateTotalAmount(cart) {
    let total = 0;

    for(let i =0;i<cart.length;i++){
        const item = cart[i]
        total+= item.price*item.quantity
    }
    return total
}

function calculateTotalAmount2(cart){
    return cart.reduce((total, item) => 
        total+ item.price*item.quantity, 0
    )
}