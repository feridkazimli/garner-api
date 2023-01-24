const express = require("express");
const dataSource = require("./src/configs/connect");
const app = express();
const path = require('path')
const fs = require('fs');
require('dotenv').config()

app.use(express.json())

dataSource
    .initialize()
    .then(() => console.log("Happy"))
    .catch((error) => console.log("Opps", error));


const routeHandlers = function (directory, app) {
    fs.readdirSync(directory).forEach(function (folderName) {
        app.use(`/${folderName}`, require(directory + '/' + folderName))
    })
}

routeHandlers('./src/modules', app)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})