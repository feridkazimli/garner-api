const dataSource = require('../../../../configs/connect')
const refreshToken = require('../../../../entities/Refresh')
const Users = require('../../../../entities/Users')

const userRepository = dataSource.getRepository(Users)

const refreshTokenRepository = dataSource.getRepository(refreshToken)

module.exports.createRefreshToken = async (param) => {
    const newToken = refreshTokenRepository.create(param)
    return await refreshTokenRepository.save(newToken);
}

module.exports.deleteRefreshToken = async ({ userId, id }) => {
    return await refreshTokenRepository.remove({ userId, id })
}

module.exports.findUserById = async ({ id }) => {
    return await userRepository.findOneByOrFail({ id })
}

module.exports.findTokenById = async (userId) => {
    return await refreshTokenRepository.findOneBy({ userId })
}


