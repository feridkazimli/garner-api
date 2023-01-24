const express = require('express');
const dataSource = require('./src/configs/connect');
const path = require('path')
const fs = require('fs');
const app = express()
const port = 3000

dataSource.initialize()
.then(() => console.log('Happy'))
.catch(error => console.log('Opps'))


const routeHandlers = function (directory, app) {
    fs.readdirSync(directory).forEach(function (folderName) {
        app.use(`/${folderName}`, require(directory + '/' + folderName))
    })
  }
  
  
  
  routeHandlers('./src/modules',app)
  
  app.use((req, res, next) => {
      res.send('salamlar qaqa')
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});