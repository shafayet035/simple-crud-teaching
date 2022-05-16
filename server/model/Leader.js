const mongoose = require("mongoose");

const { Schema } = mongoose;

const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Leader", leaderSchema);
