const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;

test("POST /directors should return status 201 and successfully create a new director", async () => {
	const director = {
		firstName: "Chad",
		lastName: "Stahelski",
		nationality: "United States",
		image: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/eRCryGwKDH4XqUlrdkERmeBWPo8.jpg",
		birthday: "1968-09-20",
	};

	const res = await request(app).post("/directors").send(director);
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
	directorId = res.body.id;
});

test("GET /directors should return status 200 and get the actor we just created", async () => {
	const res = await request(app).get("/directors");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("UPDATE /directors/:id should return status 200 and successfully update the current director", async () => {
	const res = await request(app)
		.put(`/directors/${directorId}`)
		.send({ nationality: "Canadian" });

	expect(res.status).toBe(200);
	expect(res.body.nationality).toBe("Canadian");
});

test("DELETE /directors/:id should return status 204 and successfully remove the current director from the database", async () => {
	const res = await request(app).delete(`/directors/${directorId}`);
	expect(res.status).toBe(204);
});
