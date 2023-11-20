const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('간단 프로필');
});

router.get('/profile', (req, res) => {
    res.send('프로필');
});

router.post('/profile', (req, res) => {
    res.send('프로필 등록');
});

router.put('/profile', (req, res) => {
    res.send('프로필 수정');
});

router.delete('/profile', (req, res) => {
    res.send('프로필 제거');
});

router.get('/settings', (req, res) => {
    res.send('사용자 설정');
});

module.exports = router;