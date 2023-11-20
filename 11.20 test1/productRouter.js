const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('간단 상품 프로필');
});

router.get('/details', (req, res) => {
    res.send('상품 세부 정보');
});

router.get('/list', (req, res) => {
    res.send('상품 리스트');
});

module.exports = router;