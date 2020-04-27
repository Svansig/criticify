var mongoose = require("mongoose");

const bandSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: String,
  images: {
    large: String,
    medium: String,
    small: String,
  },
  genres: [String],
  albums: [
    {
      name: String,
      id: String,
      images: {
        large: String,
        medium: String,
        small: String,
      },
    },
  ],
  members: [
    {
      name: String,
      id: String,
    },
  ],
});

module.exports = mongoose.model("Band", bandSchema);
