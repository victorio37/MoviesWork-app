const catchError = require("../utils/catchError");
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

const getAll = catchError(async (req, res) => {
	const actors = await Actor.findAll({ include: [Movie], order: ["id"] });
	return res.json(actors);
});

const createActor = catchError(async (req, res) => {
	const { firstName, lastName, nationality, image, birthday } = req.body;
	const actor = await Actor.create({
		firstName,
		lastName,
		nationality,
		image,
		birthday,
	});
	return res.status(201).json(actor);
});

const getOneActor = catchError(async (req, res) => {
	const { id } = req.params;
	const actor = await Actor.findByPk(id, { include: [Movie] });
	return res.json(actor);
});

const removeActor = catchError(async (req, res) => {
	const { id } = req.params;
	await Actor.destroy({ where: { id } });
	return res.sendStatus(204);
});

const updateActor = catchError(async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, nationality, image, birthday } = req.body;
	const updatedActor = await Actor.update(
		{ firstName, lastName, nationality, image, birthday },
		{ where: { id }, returning: true }
	);
	return res.json(updatedActor[1][0]);
});

module.exports = {
	getAll,
	createActor,
	getOneActor,
	removeActor,
	updateActor,
};
