const {
	getAll,
	createGenre,
	getOneGenre,
	removeGenre,
	updateGenre,
} = require("../controllers/genre.controllers");
const express = require("express");

const genreRouter = express.Router();

genreRouter.route("/").get(getAll).post(createGenre);

genreRouter.route("/:id").get(getOneGenre).delete(removeGenre).put(updateGenre);

module.exports = genreRouter;
