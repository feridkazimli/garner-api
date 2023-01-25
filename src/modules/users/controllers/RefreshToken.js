const jwt = require('jsonwebtoken');
const dataSource = require('../../../configs/connect');
const rToken = require('../../../entities/Refresh');
const refreshtoken = async(req, res) => {
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);

            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            res.json({ accessToken,refreshToken });
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = refreshtoken