import request from "supertest"
import { describe, expect, it } from "vitest"

import { app } from "../../src/app.js"
import { prisma } from "../../src/shared/prisma/prisma-client.js"

describe("Stack Controller", () => {
	it("should create a stack", async () => {
		const response = await request(app.server).post("/stacks").send({
			name: "TypeScript",
			iconUrl: "https://cdn.example.com/typescript.svg",
		})

		expect(response.status).toBe(201)

		expect(response.body).toEqual({
			data: {
				id: response.body.data.id,
				name: "TypeScript",
				iconUrl: "https://cdn.example.com/typescript.svg",
			},
		})

		const stacks = await prisma.stack.findMany()

		expect(stacks).toHaveLength(1)
		expect(stacks[0]).toMatchObject({
			id: response.body.data.id,
			name: "TypeScript",
			iconUrl: "https://cdn.example.com/typescript.svg",
		})
	})

	it("should not create a stack with an invalid payload", async () => {
		const response = await request(app.server).post("/stacks").send({
			name: "",
		})

		expect(response.status).toBe(400)
	})

	it("should list all stacks", async () => {
		await prisma.stack.createMany({
			data: [
				{
					name: "TypeScript",
					iconUrl: "https://cdn.example.com/typescript.svg",
				},
				{ name: "Node.js", iconUrl: "https://cdn.example.com/node.svg" },
			],
		})

		const response = await request(app.server).get("/stacks")

		expect(response.status).toBe(200)
		expect(response.body.data).toHaveLength(2)
	})

	it("should get a stack by id", async () => {
		const stack = await prisma.stack.create({
			data: {
				name: "Fastify",
				iconUrl: "https://cdn.example.com/fastify.svg",
			},
		})

		const response = await request(app.server).get(`/stacks/${stack.id}`)

		expect(response.status).toBe(200)

		expect(response.body).toEqual({
			data: {
				id: stack.id,
				name: "Fastify",
				iconUrl: "https://cdn.example.com/fastify.svg",
			},
		})
	})

	it("should return 404 when stack does not exist", async () => {
		const response = await request(app.server).get("/stacks/999")

		expect(response.status).toBe(404)
	})

	it("should update a stack", async () => {
		const stack = await prisma.stack.create({
			data: {
				name: "JS",
				iconUrl: "https://cdn.example.com/js.svg",
			},
		})

		const response = await request(app.server).put(`/stacks/${stack.id}`).send({
			name: "JavaScript",
			iconUrl: "https://cdn.example.com/javascript.svg",
		})

		expect(response.status).toBe(200)

		expect(response.body.data).toMatchObject({
			name: "JavaScript",
			iconUrl: "https://cdn.example.com/javascript.svg",
		})

		const updated = await prisma.stack.findUnique({
			where: { id: stack.id },
		})

		expect(updated).toMatchObject({
			name: "JavaScript",
			iconUrl: "https://cdn.example.com/javascript.svg",
		})
	})

	it("should delete a stack", async () => {
		const stack = await prisma.stack.create({
			data: {
				name: "React",
				iconUrl: "https://cdn.example.com/react.svg",
			},
		})

		const response = await request(app.server).delete(`/stacks/${stack.id}`)

		expect(response.status).toBe(204)

		const stacks = await prisma.stack.findMany()

		expect(stacks).toHaveLength(0)
	})
})
