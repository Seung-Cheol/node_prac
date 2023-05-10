const jwt = require("jsonwebtoken");
const Member = require("../schemas/member");
const secretkey = 'nodeprac'


module.exports = async (req, res, next) => {
  const {auth} = req.cookies;
  
    const [tokenType,token] = auth.split(" ");
    if (tokenType !== "Bearer") {
      return res.status(401).json({ message: "토큰 타입이 일치하지 않습니다." });
    }

    const decodedToken = jwt.verify(token, secretkey);
    const userNickname = await decodedToken['user'];
    console.log(typeof(userNickname))
    try {
    const user = await Member.findOne({'user':userNickname}).catch(e=>console.log(e));
    if (!user) {
      res.clearCookie("auth");
      return res.status(401).json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie("auth");
    return res.status(401).json({
      message: "비정상적인 요청입니다."+error+auth
    });
  }
}