const axios = require('axios');

const base_url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn';
const usd_url = base_url + '?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=2';

axios.get(usd_url).then(response => {
    console.log(response.data);
    console.log(response.data.country[1].value);

});