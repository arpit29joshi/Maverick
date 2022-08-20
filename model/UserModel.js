const { ObjectId } = require("mongodb");
const { getDB } = require("../db");
const bcrypt = require("bcrypt");

const registerModel = async ({ obj, password }) => {
  const { email, refId, name, side, UserName, mobileNumber } = obj;
  const db = await getDB();
  const exist = await db.collection("member").findOne({ email });
  if (exist) {
    throw Error("User Already with this email");
  }
  const user = await db
    .collection("member")
    .insertOne({ email, refId, name, side, UserName, mobileNumber, password });
  return user;
};
const logInModel = async ({ email, password }) => {
  const db = await getDB();
  const user = await db.collection("member").findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Password");
  }
  return user;
};
module.exports = {
  registerModel,
  logInModel,
};
