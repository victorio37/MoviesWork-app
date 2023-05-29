const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;

const movie = {
	name: "Rambo 4",
	image: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/gh2bmprLtUQ8oXCSluzfqaicyrm.jpg",
	synopsis:
		"John Wick descubre un camino para derrotar a la Alta Mesa. Pero para poder ganar su libertad, Wick deberá enfrentarse a un nuevo rival con poderosas alianzas en todo el mundo, capaz de convertir a viejos amigos en enemigos.",
	releaseYear: 2023,
};

const actor = {
	firstName: "Victor",
	lastName: "Vera",
	nationality: "Canadian",
	image: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg",
	birthday: "1964-09-2",
};

const director = {
	firstName: "Chad",
	lastName: "Stahelski",
	nationality: "United States",
	image: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/eRCryGwKDH4XqUlrdkERmeBWPo8.jpg",
	birthday: "1968-09-20",
};

// TESTS

test("POST /movies should return status 201 and successfully create a new movie", async () => {
	const res = await request(app).post("/movies").send(movie);

	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
	movieId = res.body.id;
});

test("GET /movies should return status 200 and get the movie we just created", async () => {
	const res = await request(app).get("/movies");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id should return status 200 and successfully updated the current movie", async () => {
	const res = await request(app)
		.put(`/movies/${movieId}`)
		.send({ releaseYear: 2020 });

	expect(res.status).toBe(200);
	expect(res.body.releaseYear).toBe(2020);
});

test("POST /movies/:id/actors should return status 200 and set an actor to the current movie", async () => {
	const createdActor = await Actor.create(actor);

	const res = await request(app)
		.post(`/movies/${movieId}/actors`)
		.send([createdActor.id]);

	createdActor.destroy();

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should return status 200 and set a director to the current movie", async () => {
	const createdDirector = await Director.create(director);

	const res = await request(app)
		.post(`/movies/${movieId}/directors`)
		.send([createdDirector.id]);

	createdDirector.destroy();

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should return status 200 and set a genre to the current movie", async () => {
	const createdGenre = await Genre.create({ name: "Action" });

	const res = await request(app)
		.post(`/movies/${movieId}/genres`)
		.send([createdGenre.id]);

	createdGenre.destroy();

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should return status 204 and successfully remove the current movie from the database", async () => {
	const res = await request(app).delete(`/movies/${movieId}`);
	expect(res.status).toBe(204);
});
