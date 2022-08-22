const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    if (!ObjectId.isValid(_id)) {
      res.status(400).json({ error: "Someting wrong :(" });
    }
    const db = await getDB();
    // req.user = await db.collection("member").findOne({ _id }).select({ _id }); //find with _id , return only _id and set at req
    req.user = await db.collection("member").findOne({ _id: ObjectId(_id) });
    next();
  } catch (error) {
    res.status(401).json({ error: "Not Authorized" });
  }
};
module.exports = requireAuth;
