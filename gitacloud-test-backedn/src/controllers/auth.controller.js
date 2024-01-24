const bcrypt = require("bcryptjs");
const { NewUserModel } = require("../models/newuser.model");
const { findOneUser } = require("../utils/helpers");
const { generateJwtToken } = require("../utils/helpers");

const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const { email, password } = req.body;
    const user = await findOneUser(NewUserModel, { email });

    if (!user) {
      throw new Error({ error: "Invalid login credentials" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error({ error: "Invalid login credentials" });
      } else {
        const token = generateJwtToken(user._id);
        return res.status(200).send({
          data: user,
          token: token,
          expiresIn: "10h",
          status: "success",
        });
      }
    }
  } catch (error) {

    return res.status(500).send({
      message: "Some error occurred while checking credentail",
      status: "error",
    });
  }
};

module.exports = { login };
