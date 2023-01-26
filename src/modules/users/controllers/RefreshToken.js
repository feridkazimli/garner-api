const jwt = require("jsonwebtoken");
const CustomError = require("../../../utils/CustomError");
const Handler = require("../../../utils/Handler");
const ResponseSuccess = require("../../../utils/ResponseSuccess");
const {
    v4: uuidv4
} = require('uuid');
const {
  findUserById,
  findTokenById,
  deleteRefreshToken,
  createRefreshToken,
} = require("../models/users/");
const refreshToken = Handler(async (req, res, next) => {
  const refreshTokencheck = req.body.refreshToken;
  if (!refreshTokencheck) throw new CustomError("refreshToken don't come");
  const decode = jwt.verify(
    refreshTokencheck,
    process.env.REFRESH_TOKEN_SECRET,
     (err, decode) => {
      if (err) {
        throw new CustomError(err.message);
      }

      return decode;

    }
  );
  const { id, userId } = decode;
  const isreftokendetail = await findTokenById(userId);
  if (!isreftokendetail) {
    throw new CustomError("not refreshToken in database");
  }
  await deleteRefreshToken(isreftokendetail);
  const uuid = uuidv4();
  await createRefreshToken({
    id: uuid,
    userId: userId,
  });
  const user = await findUserById(userId);
  const { email } = user;
  const accessToken = jwt.sign(
    {
      userId,
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "4m",
    }
  );
  const refreshToken = jwt.sign(
    {
      id: uuid,
      userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

 // res.json({ accessToken, refreshToken });
 ResponseSuccess(res,{accessToken,refreshToken},"Succsess send tokens")
});

module.exports = {
  refreshToken,
};
