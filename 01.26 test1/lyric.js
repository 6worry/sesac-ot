const axios = require('axios');

const base_url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn';

const searchLyric = async(query) => {
    const response = await axios.get(base_url, {
        params: {
            where: "nexearch",
            key: "LyricsSearchResult",
            pkid: "519",
            u1: 1,
            u2: 5,
            u3: "0",
            u4: "0",
            q: "가사검색" + query,
        }
    });
    console.log(response.data)
};

searchLyric('연기처럼 밀려드는')