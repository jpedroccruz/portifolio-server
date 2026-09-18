import request from "supertest"
import { describe, expect, it } from "vitest"

import { app } from "../../src/app.js"

describe("Message Controller", () => {
	it("should send a contact message", async () => {
		const response = await request(app.server).post("/contact").send({
			name: "John Doe",
			email: "john.doe@test.com",
			message: "Hello World",
		})

		expect(response.statusCode).toBe(204)
	})

	it("should not send a contact message if no wrong data is sent", async () => {
		const response = await request(app.server).post("/contact").send({})

		expect(response.statusCode).toBe(400)
	})
})
