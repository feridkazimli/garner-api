const express = require('express');
const dataSource = require('./src/configs/connect');
const CustomError = require('./src/utils/CustomError');
const Handler = require('./src/utils/Handler');
const ResponseSuccess = require('./src/utils/ResponseSuccess');

const app = express()
const port = 3000

dataSource.initialize()
.then(() => console.log('Happy'))
.catch(error => console.log('Opps'))

app.get('/login', 
    Handler(async (req,res,next)=>{
        throw new CustomError({
            text:"xeta",
            statusType: "error"
        },
        400
        );
        ResponseSuccess(res,null,{text:"Salam"});
    })
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});