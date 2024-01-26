const axios = require('axios');
const cheerio = require('cheerio');
const base_url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn';

const searchLyric = async(query) => {
    try {
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
        const currentHTML = response.data.current.html;
        const currentResults = processLyricsInfo(currentHTML);

        // Process the next HTML
        const nextHTML = response.data.next.html;
        const nextResults = processLyricsInfo(nextHTML);

        // Combine the results if needed
        const allResults = currentResults.concat(nextResults);

        // Do something with the final results
        console.log('Final Results:', allResults);
    } catch (err) {
        console.error('오류', err);
    }
};

const processLyricsInfo = (html) => {
    const $ = cheerio.load(html);

    const results = [];

    $('li[role="tab"]').each((index, element) => {
        const title = $(element).find('.music_title a').text().trim();
        const artist = $(element).find('.music_detail a').eq(0).text().trim();

        results.push({
            title,
            artist,
        });
    });

    return results;
};

searchLyric('연기처럼 밀려드는')