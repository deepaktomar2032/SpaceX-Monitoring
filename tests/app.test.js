const request = require("supertest");
const { app } = require("../src/server.js");

describe("SpaceX Monitoring App", () => {
    it("Responds with 200 OK on GET /api/data", async () => {
        const response = await request(app).get("/api/data");
        expect(response.status).toBe(200);
    });

    it("Responds with 200 OK and data on GET /api/data", async () => {
        const response = await request(app).get("/api/data");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
