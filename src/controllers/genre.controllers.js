const catchError = require("../utils/catchError");
const Genre = require("../models/Genre");
const Movie = require("../models/Movie");

const getAll = catchError(async (req, res) => {
	const genres = await Genre.findAll({ include: [Movie], order: ["id"] });
	return res.json(genres);
});

const createGenre = catchError(async (req, res) => {
	const { name } = req.body;
	const genre = await Genre.create({ name });
	return res.status(201).json(genre);
});

const getOneGenre = catchError(async (req, res) => {
	const { id } = req.params;
	const genre = await Genre.findByPk(id, { include: [Movie] });
	return res.json(genre);
});

const removeGenre = catchError(async (req, res) => {
	const { id } = req.params;
	await Genre.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateGenre = catchError(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const updatedGenre = await Genre.update(
		{ name },
		{ where: { id }, returning: true }
	);
	return res.json(updatedGenre[1][0]);
});

module.exports = {
	getAll,
	createGenre,
	getOneGenre,
	removeGenre,
	updateGenre,
};
