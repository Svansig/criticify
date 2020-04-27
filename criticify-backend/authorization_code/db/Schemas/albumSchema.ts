const albumSchema = new mongoose.Schema({
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
  artists: [
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
  total_tracks: Number,
  tracks: [
    {
      name: String,
      id: String,
      artists: [
        {
          name: String,
          id: String,
        },
      ],
      reviews: [
        {
          userID: String,
          rating: Number,
          description: String,
        },
      ],
    },
  ],
  reviews: [
    {
      userID: String,
      rating: Number,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Album", albumSchema);
