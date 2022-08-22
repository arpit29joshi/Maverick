const { ObjectId } = require("mongodb");
const { getDB } = require("../db");
const bcrypt = require("bcrypt");
const validator = require("validator");

const updateProflieModel = async ({ id, obj }) => {
  const db = await getDB();
  const user = await db.collection("member").findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set: {
        ...obj,
      },
    },
    {
      upsert: true,
      returnDocument: "after", // this is new !
    }
  );
  return user;
};
const changePasswordModel = async ({ id, obj }) => {
  const db = await getDB();
  const { password, newPassword } = obj;
  const exist = await db.collection("member").findOne({ _id: ObjectId(id) });
  if (!exist) {
    throw Error("Something Wrong");
  }
  const match = await bcrypt.compare(password, exist.password);
  if (!match) {
    throw Error("Old password does not match");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw Error("Password is not strong enough");
  }
  const salt = await bcrypt.genSalt(10); //rendom value to make pass more secure
  const hash = await bcrypt.hash(newPassword, salt);
  const user = await db.collection("member").findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set: {
        password: hash,
      },
    },
    {
      upsert: true,
      returnDocument: "after", // this is new !
    }
  );
  return user;
};
module.exports = { updateProflieModel, changePasswordModel };
