const crypto = require("crypto");
const { ApolloServer, gql } = require("apollo-server");
const schema = require("./schema.js");
const typeDefs = gql(schema);
const database = require("./mongoDb");
const library = require("./library");
const resolvers = {
  Query: {
    getPastBookings: async (context, data) => {
      let { status, user } = await library.loggedIn(data);
      if (!status) throw new Error("401 UNAUTHORIZED");
      let querry = database.BOOKING.find({
        user: database.mongoose.Types.ObjectId(user._id)
      }).select("user source destination -_id");
      let result = await querry.exec();
      return result;
    },
    getNearbyCabs: async (context, data) => {
      let querry = database.CAB.find({
        location: {
          $near: {
            $maxDistance: 10000,
            $geometry: {
              type: "Point",
              coordinates: [data.lat, data.long]
            }
          }
        }
      });
      let results = await querry.exec();
      // console.log(results);
      return results;
    },
    login: async (context, data) => {
      let { status } = await library.loggedIn(data);
      return status;
    }
  },
  Mutation: {
    createBooking: async (context, data) => {
      let { status, user } = await library.loggedIn(data);
      if (!status) throw new Error("401 UNAUTHORIZED");
      let newBooking = new database.BOOKING({
        user: user._id,
        source: {
          type: "Point",
          coordinates: [data.fromLat, data.fromLong]
        },
        destination: {
          type: "Point",
          coordinates: [data.toLat, data.toLong]
        }
      });
      await newBooking.save();
      return true;
    }
  }
};
const server = new ApolloServer({ typeDefs, resolvers });
module.exports = server;
