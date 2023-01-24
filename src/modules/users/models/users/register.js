const bcrypt = require('bcrypt')
const dataSource = require('../../../../configs/connect')
const User = require('../../../../entities/Users')

const userRepository = dataSource.getRepository(User)

module.exports.createUser = async (user) => {
    const newUser = userRepository.create(user)

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    const storedUser = await userRepository.save(newUser)

    return storedUser
}

module.exports.findByEmail = async ({ email }) => {
    return await userRepository.findOneBy({ email })
}

// module.exports.findById = async ({ id }) => {
//     return await userRepository.findOneBy({ id })
// }

