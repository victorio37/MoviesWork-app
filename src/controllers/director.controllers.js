const catchError = require("../utils/catchError");
const Director = require("../models/Director");
const Movie = require("../models/Movie");

const getAll = catchError(async (req, res) => {
	const directors = await Director.findAll({
		include: [Movie],
		order: ["id"],
	});
	return res.json(directors);
});

const createDirector = catchError(async (req, res) => {
	const { firstName, lastName, nationality, image, birthday } = req.body;
	const director = await Director.create({
		firstName,
		lastName,
		nationality,
		image,
		birthday,
	});
	return res.status(201).json(director);
});

const getOneDirector = catchError(async (req, res) => {
	const { id } = req.params;
	const director = await Director.findByPk(id, { include: [Movie] });
	return res.json(director);
});

const removeDirector = catchError(async (req, res) => {
	const { id } = req.params;
	await Director.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateDirector = catchError(async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, nationality, image, birthday } = req.body;
	const updatedDiretor = await Director.update(
		{ firstName, lastName, nationality, image, birthday },
		{ where: { id }, returning: true }
	);

	return res.json(updatedDiretor[1][0]);
});

module.exports = {
	getAll,
	createDirector,
	getOneDirector,
	removeDirector,
	updateDirector,
};
