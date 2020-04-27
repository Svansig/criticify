const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
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
  bands: [
    {
      name: String,
      id: String,
      images: [
        {
          large: String,
          medium: String,
          small: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Artist", artistSchema);
