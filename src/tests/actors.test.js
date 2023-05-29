const request = require("supertest");
const app = require("../app");
require("../models");

let actorId;

test("POST /actors should return status 201 and successfully create a new actor", async () => {
	const actor = {
		firstName: "Silvestre",
		lastName: "Stalonne",
		nationality: "Estados Unidos",
		image: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg",
		birthday: "1964-09-2",
	};

	const res = await request(app).post("/actors").send(actor);
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
	actorId = res.body.id;
});

test("GET /actos should return status 200 and get an actor which we just created", async () => {
	const res = await request(app).get("/actors");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id should return status 201 and succesfully updated the current actor", async () => {
	const res = await request(app)
		.put(`/actors/${actorId}`)
		.send({ nationality: "American" });

	expect(res.status).toBe(200);
	expect(res.body.nationality).toBe("American");
});

test("DELETE /actors/:id should return status 204 and successfully remove the current actor from the database", async () => {
	const res = await request(app).delete(`/actors/${actorId}`);
	expect(res.status).toBe(204);
});
