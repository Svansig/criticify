const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: String,
  reviews: [
    {
      id: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
