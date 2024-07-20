const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    genres: [String],
    cast: [String],
    plot: String,
  },
  { collection: "movies" }
); // Specify the collection name

// Create the movie model
const Movie = mongoose.model("Movie", movieSchema);

// Create a new movie
router.post("/movies", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get the count of all movies
router.get("/movies/count", async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    res.status(200).send({ count });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a single movie by ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a movie by ID
router.patch("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).send();
    }
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a movie by ID
router.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
