const { verifyToken } = require("../utils/helpers");
const { NewUserModel } = require("../models/newuser.model");
const { findOneUser } = require("../utils/helpers");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const isVerify = verifyToken(req.headers.authorization);
    if (isVerify !== null) {
      const user = await findOneUser(NewUserModel, { _id: isVerify._id });
      if (user) {
        req.user = user
        next();
      } else {
        return res.status(400).send({ message: "Invalid user!" });
      }
    } else {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!" });
  }
};

module.exports = { authMiddleware };
