const request = require("supertest");
const app = require("../app");
require("../models");

let genreId;

test("POST /genres should return status 201 and succesfully create a new genre", async () => {
	const res = await request(app).post("/genres").send({ name: "Terror" });

	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
	genreId = res.body.id;
});

test("GET /genres should return status 200 and get the genre we just created", async () => {
	const res = await request(app).get("/genres");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT /genre/:id should return status 200 and successfully update the current genre", async () => {
	const res = await request(app)
		.put(`/genres/${genreId}`)
		.send({ name: "Action" });

	expect(res.status).toBe(200);
	expect(res.body.name).toBe("Action");
});

test("DELETE /genre/:id should return status 204 and succesfully remove the current genre from the database", async () => {
	const res = await request(app).delete(`/genres/${genreId}`);
	expect(res.status).toBe(204);
});
