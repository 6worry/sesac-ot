// const url = require('url');
import url from 'url';

const myUrl = 'https://chat.openai.com/c/963af72d-1f34-443a-916c-3c6e062ab014';

// URL Pasing

const parsedUrl = url.parse(myUrl, true);
console.log('파싱된 URL:', parsedUrl);
console.log('호스트:', parsedUrl.host);
console.log('경로:', parsedUrl.pathname);
console.log('쿼리:', parsedUrl.query);

const myUrl2 = {
    protocol: 'https',
    hostname: 'www.naver.com',
    pathname: '/search.naver',
    query: {
        query:'sesac'
    }
};

// URL 조립

const assembleUrl = url.format(myUrl2);
console.log('조립된 URL:', assembleUrl);
