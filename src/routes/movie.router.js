const {
	getAll,
	createMovie,
	getOneMovie,
	removeMovie,
	updateMovie,
	setMovieGenre,
	setMovieActor,
	setMovieDirector,
} = require("../controllers/movie.controller");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/").get(getAll).post(createMovie);

movieRouter.route("/:id").get(getOneMovie).delete(removeMovie).put(updateMovie);

movieRouter.route("/:id/genres").post(setMovieGenre);

movieRouter.route("/:id/actors").post(setMovieActor);

movieRouter.route("/:id/directors").post(setMovieDirector);

module.exports = movieRouter;
