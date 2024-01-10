const response = require("../components/response")
const jwt = require("jsonwebtoken")
const { parent } = require("../components/database")

exports.verifyTokenStudent = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log({token})
  if (token === null) return response.res401(res);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_STUDENT, (err, decoded) => {
    if (err) return response.res401(res)
    req.user = decoded;
    next()
  })
}

exports.verifyTokenParent = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return response.res401(res);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_PARENT, async (err, decoded) => {
    if (err) return response.res401(res)
    req.user = decoded;

    const findParent = await parent.findOne({
      raw: true,
      where: {
        id: decoded.userId
      },
      attributes: ["id", "studentId"]
    })
    console.log({decoded})
    req.user = { ...req.user, isParent: true, studentId: findParent.studentId }
    next()
  })
}
