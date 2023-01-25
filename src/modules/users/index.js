const {Router} = require('express');
const Handler = require('../../utils/Handler');
const forgetPassword = require('../users/controllers/forgetPassword');
const route = Router();

route.get('/forgetpassword',forgetPassword);
// route.get('/login',middleware)
// route.get('/login',middleware)


module.exports = route