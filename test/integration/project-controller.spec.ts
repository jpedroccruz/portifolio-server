import request from "supertest"
import { describe, expect, it } from "vitest"

import { app } from "../../src/app.js"
import { prisma } from "../../src/shared/prisma/prisma-client.js"

describe("Project Controller", () => {
	it("should create a project", async () => {
		const stack = await prisma.stack.create({
			data: {
				name: "TypeScript",
				iconUrl:
					"https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg",
			},
		})

		const publishedAt = new Date()

		const response = await request(app.server)
			.post("/projects")
			.send({
				name: "Portfolio",
				description: "My personal portfolio.",
				gitHubUrl: "https://github.com/johndoe/portfolio",
				thumbnailUrl: "https://example.com/thumbnail.png",
				publishedAt: publishedAt.toISOString(),
				stackIds: [stack.id],
			})

		expect(response.status).toBe(201)

		expect(response.body.data).toMatchObject({
			id: expect.any(Number),
			name: "Portfolio",
			description: "My personal portfolio.",
			gitHubUrl: "https://github.com/johndoe/portfolio",
			thumbnailUrl: "https://example.com/thumbnail.png",
		})

		const project = await prisma.project.findFirst({
			include: {
				stacks: true,
			},
		})

		expect(project).not.toBeNull()
		expect(project?.name).toBe("Portfolio")
		expect(project?.stacks).toHaveLength(1)
		expect(project?.stacks[0].id).toBe(stack.id)
	})

	it("should not create a project with an invalid payload", async () => {
		const response = await request(app.server).post("/projects").send({})

		expect(response.status).toBe(400)
	})

	it("should list all projects", async () => {
		await prisma.project.createMany({
			data: [
				{
					name: "Project A",
					description: "Description A",
					gitHubUrl: null,
					thumbnailUrl: null,
					publishedAt: new Date(),
				},
				{
					name: "Project B",
					description: "Description B",
					gitHubUrl: null,
					thumbnailUrl: null,
					publishedAt: new Date(),
				},
			],
		})

		const response = await request(app.server).get("/projects")

		expect(response.status).toBe(200)
		expect(response.body.data).toHaveLength(2)
	})

	it("should get a project by id", async () => {
		const project = await prisma.project.create({
			data: {
				name: "Portfolio",
				description: "My portfolio",
				gitHubUrl: null,
				thumbnailUrl: null,
				publishedAt: new Date(),
			},
		})

		const response = await request(app.server).get(`/projects/${project.id}`)

		expect(response.status).toBe(200)

		expect(response.body.data).toMatchObject({
			id: project.id,
			name: "Portfolio",
			description: "My portfolio",
		})
	})

	it("should return 404 when project does not exist", async () => {
		const response = await request(app.server).get("/projects/999")

		expect(response.status).toBe(404)
	})

	it("should update a project", async () => {
		const stack = await prisma.stack.create({
			data: {
				name: "React",
				iconUrl:
					"https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
			},
		})

		const project = await prisma.project.create({
			data: {
				name: "Old Project",
				description: "Old description",
				gitHubUrl: null,
				thumbnailUrl: null,
				publishedAt: new Date(),
			},
		})

		const response = await request(app.server)
			.put(`/projects/${project.id}`)
			.send({
				name: "New Project",
				description: "New description",
				gitHubUrl: "https://github.com/johndoe/new-project",
				thumbnailUrl: "https://example.com/new-thumbnail.png",
				publishedAt: new Date().toISOString(),
				stackIds: [stack.id],
			})

		expect(response.status).toBe(200)

		expect(response.body.data).toMatchObject({
			id: project.id,
			name: "New Project",
			description: "New description",
			gitHubUrl: "https://github.com/johndoe/new-project",
			thumbnailUrl: "https://example.com/new-thumbnail.png",
		})

		const updated = await prisma.project.findUnique({
			where: {
				id: project.id,
			},
			include: {
				stacks: true,
			},
		})

		expect(updated?.name).toBe("New Project")
		expect(updated?.stacks).toHaveLength(1)
		expect(updated?.stacks[0].id).toBe(stack.id)
	})

	it("should delete a project", async () => {
		const project = await prisma.project.create({
			data: {
				name: "Portfolio",
				description: "Description",
				gitHubUrl: null,
				thumbnailUrl: null,
				publishedAt: new Date(),
			},
		})

		const response = await request(app.server).delete(`/projects/${project.id}`)

		expect(response.status).toBe(204)

		const projects = await prisma.project.findMany()

		expect(projects).toHaveLength(0)
	})
})
