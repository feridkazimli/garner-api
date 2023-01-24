const { createUser, findByEmail } = require('./users/register')
// const {  model function of login} = require('./users/login') 
// const {  model function of forgotPass} = require('./users/forgotPass') 

module.exports = {
    createUser,
    findByEmail
}
