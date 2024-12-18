const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "unauthorized" });
  }
  auth = req.headers.authorization.split(" ")[1];
  try {
    let decoded = jwt.verify(auth, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "unauthorized" });
  }
}

module.exports = { authMiddleware };
