const express = require('express');
const dataSource = require('./src/configs/connect');

const app = express()
const port = 3000

dataSource.initialize()
.then(() => console.log('Happynes'))
.catch(error => console.log('💣 God damn!'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})