const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    genres: [String],
    cast: [String],
    plot: String,
  },
  { collection: "movies" }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
