const { MongoClient } = require("mongodb");
require("dotenv/config");
async function getDB() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.URL)
      .then((client) => {
        dbConnection = client.db();
        resolve(dbConnection);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = { getDB };
// module.exports = {
//   connectionDB: (cb) => {
//     MongoClient.connect(process.env.URL)
//       .then((client) => {
//         dbConnection = client.db();
//         return cb();
//       })
//       .catch((err) => {
//         console.log(err);
//         return cb(err);
//       });
//   },
//   getDB: () => dbConnection,
// };
