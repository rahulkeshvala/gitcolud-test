const { NewUserModel } = require("../models/newuser.model");

const saveUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  try {
    const newUser = new NewUserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    return res.status(200).send({ data: newUser, status: "success" });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while storing data.",
      status: "error",
    });
  }
};



module.exports = { saveUser };
