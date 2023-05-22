const {
	getAll,
	createActor,
	getOneActor,
	removeActor,
	updateActor,
} = require("../controllers/actor.controllers");
const express = require("express");

const actorRouter = express.Router();

actorRouter.route("/").get(getAll).post(createActor);

actorRouter.route("/:id").get(getOneActor).delete(removeActor).put(updateActor);

module.exports = actorRouter;
