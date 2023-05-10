const jwt = require("jsonwebtoken");
const { Member } = require("../schemas");
const secretkey = 'nodeprac'


module.exports = async (req, res, next) => {
  try {
    const { auth } = req.cookies;
    const [tokenType, token] = auth.split(" ");
    if (tokenType !== "Bearer") {
      return res.status(401).json({ message: "토큰 타입이 일치하지 않습니다." });
    }

    const decodedToken = jwt.verify(token, secretkey);
    const userNickname = decodedToken.user;

    const user = await Member.find({userNickname});
    if (!user) {
      res.clearCookie("auth");
      return res.status(401).json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie("auth");
    return res.status(401).json({
      message: "비정상적인 요청입니다."
    });
  }
}