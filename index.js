const express = require("express");
require("dotenv/config");
// const { connectionDB, getDB } = require("./db");
const User = require("./routes/User");
const Member = require("./routes/Member");

//app init and middleware
const app = express();
app.use(express.json());

//check if their is some data then pass in res
app.use(express.json());
//middlerware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", User);
app.use("/api/member", Member);

app.listen(process.env.PORT, () => {
  console.log("Server Start");
});
// app.use((req, res, next) => {
//   console.log("in app use");
//   connectionDB((err) => {
//     console.log("in connection");
//     if (!err) {
//       console.log("there is no errors");
//     } else {
//       console.log("in error");
//     }
//     console.log("out");
//     req.db = getDB();
//     console.log("got db", req.db);
//   });
//   next();
// });
