var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cabservice", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var USER = mongoose.model("User", {
  username: String,
  password: String
});
var BOOKING = mongoose.model("Booking", {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  source: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  destination: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
var cabSchema = new mongoose.Schema({
  driver: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
cabSchema.index({ location: "2dsphere" });
var CAB = mongoose.model("Cab", cabSchema);
module.exports = {
  CAB: CAB,
  USER: USER,
  BOOKING: BOOKING,
  mongoose: mongoose
};
