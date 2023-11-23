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

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(port, () => {
    console.log(`${port} 완완료`);
});

