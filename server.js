const express = require("express");
const dataSource = require("./src/configs/connect");
const userRouter = require('./src/modules/users/index')
const app = express();
require('dotenv').config()
app.use(express.json())

dataSource
    .initialize()
    .then(() => console.log("Happy"))
    .catch((error) => console.log("Opps", error));

app.use('/api/users', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});