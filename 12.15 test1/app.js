const express = require('express');
const { getSeoulPopulationData } = require('./data');
const nunjucks = require('nunjucks');

const app = express();
const port = 3002;

nunjucks.configure('views', {
    express: app
});

app.set('view engine', 'html')

app.get('/', (req, res) => {
    const SeoulData = getSeoulPopulationData();
    res.render('population_map', {
        seoulData: JSON.stringify(SeoulData)
    })
})

app.listen(port, () => {
    console.log(`${port} 준비 완료`)
})