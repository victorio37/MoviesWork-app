const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const getAll = catchError(async (req, res) => {
	const movies = await Movie.findAll({
		include: [Actor, Director, Genre],
		order: ["id"],
	});
	return res.json(movies);
});

const createMovie = catchError(async (req, res) => {
	const { name, image, synopsis, releaseYear } = req.body;
	const movie = await Movie.create({ name, image, synopsis, releaseYear });
	return res.status(201).json(movie);
});

const getOneMovie = catchError(async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findByPk(id, {
		include: [Actor, Director, Genre],
	});
	return res.json(movie);
});

const removeMovie = catchError(async (req, res) => {
	const { id } = req.params;
	await Movie.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateMovie = catchError(async (req, res) => {
	const { id } = req.params;
	const { name, image, synopsis, releaseYear } = req.body;
	const updatedMovie = await Movie.update(
		{ name, image, synopsis, releaseYear },
		{ where: { id }, returning: true }
	);
	return res.json(updatedMovie);
});

const setMovieGenre = catchError(async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findByPk(id);
	await movie.setGenres(req.body);
	const genres = await movie.getGenres();
	return res.json(genres);
});

const setMovieActor = catchError(async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findByPk(id);
	await movie.setActors(req.body);
	const actors = await movie.getActors();
	return res.json(actors);
});

const setMovieDirector = catchError(async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findByPk(id);
	await movie.setDirectors(req.body);
	const directors = await movie.getDirectors();
	return res.json(directors[1][0]);
});

module.exports = {
	getAll,
	createMovie,
	getOneMovie,
	removeMovie,
	updateMovie,
	setMovieGenre,
	setMovieActor,
	setMovieDirector,
};
