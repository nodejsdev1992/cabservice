const db = require("../database/mongoDb");
const crypto = require("crypto");

//Create 100 users

var users = [];
for (let i = 0; i < 100; i++) {
  users.push({
    username: `user_${i + 1}`,
    password: crypto
      .createHash("sha256")
      .update(`password${i + 1}`)
      .digest("hex")
  });
}


//create 100 cabs
var cabs = [];
for (let i = 0; i < 100; i++) {
  cabs.push({
    driver: `driver_${i + 1}`,
    location: {
      type: "Point",
      coordinates: [70 + Math.random(), 30 + Math.random()]
    }
  });
}
db.USER.insertMany(users)
  .then(function(docs) {
    console.log(`Inserted ${docs.length}`);
    db.CAB.insertMany(cabs)
      .then(function(docs) {
        console.log(`Inserted ${docs.length}`);
        db.mongoose.disconnect();
      })
      .catch(function(err) {
        console.error(err);
      });
  })
  .catch(function(err) {
    console.error(err);
  });
