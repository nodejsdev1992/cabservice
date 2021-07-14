const database = require("./mongoDb");
const crypto = require("crypto");
const loggedIn = async request => {
  try {
    let user = await database.USER.findOne({
      username: request.username
    }).exec();
    if (user) {
      //valid user found
      if (
        crypto
          .createHash("sha256")
          .update(request.password)
          .digest("hex") == user.password
      )
        return { status: true, user: user };
    }
    return { status: false };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
};
module.exports = {
  loggedIn: loggedIn
};
