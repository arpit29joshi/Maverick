const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { registerModel, logInModel } = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
const register = async (req, res) => {
  const { email, password, refId, name, side, UserName, mobileNumber } =
    req.body;
  //validation
  if (
    !email ||
    !password ||
    !refId ||
    !name ||
    !side ||
    !UserName ||
    !mobileNumber
  ) {
    res.status(400).json({ msg: "All fields musts be filled" });
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ msg: "Email is not valid" });
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({
      msg: "Password is not strong enough (min 7 letter and include special char. and no.)",
    });
  }

  const salt = await bcrypt.genSalt(10); //rendom value to make pass more secure
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await registerModel({ obj: req.body, password: hash });
    const token = createToken(user._id);
    res.status(200).json({ email, token });

    res.status(200).json({});
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "All fields musts be filled" });
  }
  try {
    const user = await logInModel({ email, password });
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
module.exports = {
  register,
  logIn,
};
