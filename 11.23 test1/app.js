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
    res.json(products);
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];

    console.log('Session Info:', req.sessionStore.sessions);
    res.json(cart);
});

app.post('/add-to-cart/:productid', (req, res) => {
    const productid = parseInt(req.params.productid);
    const product = products.find((p) => p.id == productid);

    if (!product) {
        return res.status(404).json({message: '상품을 못찾겠어'});
    };

    const cart = req.session.cart || [];
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price
    });

    req.session.cart = cart;
    res.json({message: '상품 추가함', cart});
});

app.delete('/remove-to-cart/:productid', (req, res) => {
    const productid = parseInt(req.params.productid);
    const product = products.find((p) => p.id == productid);

    const cart = req.session.cart
    // req.session.cart = cart;
    delete products[cart];
    res.json({message: '상품 제거함'});
});


app.listen(port, () => {
    console.log(`${port} 완완료`);
});

