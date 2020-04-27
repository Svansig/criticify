var mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userID: String,
  name: String,
  track_title: String,
  album_title: String,
  artist_name: String,
  rating: Number,
  description: String,
});

module.exports = mongoose.model("Review", reviewSchema);
