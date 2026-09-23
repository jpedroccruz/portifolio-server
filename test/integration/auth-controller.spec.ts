import request from "supertest"
import { beforeEach, describe, expect, it } from "vitest"
import { app } from "../../src/app.ts"
import { hashPassword } from "../../src/shared/lib/hash-password.ts"
import { prisma } from "../../src/shared/prisma/prisma-client.js"

describe("Auth Controller", async () => {
	const PASSWORD_HASH = await hashPassword("123456")

	beforeEach(async () => {
		await prisma.user.create({
			data: {
				username: "John Doe",
				passwordHash: PASSWORD_HASH,
			},
		})
	})

	it("should login successfully", async () => {
		const response = await request(app.server).post("/login").send({
			name: "John Doe",
			password: "123456",
		})

		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			data: {
				accessToken: expect.any(String),
			},
		})
		expect(response.headers["set-cookie"]).toEqual(
			expect.arrayContaining([expect.stringContaining("refreshToken=")]),
		)

		const tokens = await prisma.refreshToken.findMany()

		expect(tokens).toHaveLength(1)
	})

	it("should not login with an invalid username", async () => {
		const response = await request(app.server).post("/login").send({
			name: "Harry Doe",
			password: "123456",
		})

		expect(response.status).toBe(400)
		expect(response.body.code).toBe("INVALID_CREDENTIALS")
	})

	it("should not login with an invalid password", async () => {
		const response = await request(app.server).post("/login").send({
			name: "John Doe",
			password: "1234567",
		})

		expect(response.status).toBe(400)
		expect(response.body.code).toBe("INVALID_CREDENTIALS")
	})

	it("should not login with an invalid payload", async () => {
		const response = await request(app.server).post("/login").send({
			name: "",
			password: "",
		})

		expect(response.status).toBe(400)
	})

	it("should logout successfully", async () => {
		const agent = request.agent(app.server)

		const login = await agent.post("/login").send({
			name: "John Doe",
			password: "123456",
		})

		const accessToken = login.body.data.accessToken

		const response = await agent
			.post("/logout")
			.set("Authorization", `Bearer ${accessToken}`)

		expect(response.status).toBe(200)

		const tokens = await prisma.refreshToken.findMany()

		expect(tokens).toHaveLength(0)
	})

	it("should not logout with an invalid refresh token", async () => {
		const login = await request(app.server).post("/login").send({
			name: "John Doe",
			password: "123456",
		})

		const accessToken = login.body.data.accessToken

		const response = await request(app.server)
			.post("/logout")
			.set("Cookie", "refreshToken=invalid-refresh-token")
			.set("Authorization", `Bearer ${accessToken}`)

		expect(response.body.code).toBe("INVALID_REFRESH_TOKEN")
		expect(response.status).toBe(401)
	})

	it("should not logout with an invalid payload", async () => {
		const login = await request(app.server).post("/login").send({
			name: "John Doe",
			password: "123456",
		})

		const accessToken = login.body.data.accessToken

		const response = await request(app.server)
			.post("/logout")
			.set("Cookie", "refreshToken=")
			.set("Authorization", `Bearer ${accessToken}`)

		expect(response.status).toBe(400)
	})

	it("should refresh tokens successfully", async () => {
		const agent = request.agent(app.server)

		await agent.post("/login").send({
			name: "John Doe",
			password: "123456",
		})

		const oldTokens = await prisma.refreshToken.findMany()

		const response = await agent.post("/refresh")

		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			data: {
				accessToken: expect.any(String),
			},
		})

		const newTokens = await prisma.refreshToken.findMany()

		expect(newTokens).toHaveLength(1)
		expect(newTokens[0].tokenId).not.toBe(oldTokens[0].tokenId)
	})

	it("should not refresh with an invalid refresh token", async () => {
		const response = await request(app.server)
			.post("/refresh")
			.set("Cookie", "refreshToken=invalid-refresh-token")

		expect(response.status).toBe(401)
		expect(response.body.code).toBe("INVALID_REFRESH_TOKEN")
	})

	it("should not refresh with an invalid payload", async () => {
		const response = await request(app.server).post("/refresh").send()

		expect(response.status).toBe(400)
	})

	it("should get authenticated user data with valid token", async () => {
		const login = await request(app.server).post("/login").send({
			name: "John Doe",
			password: "123456",
		})

		const accessToken = login.body.data.accessToken

		const response = await request(app.server)
			.get("/me")
			.set("Authorization", `Bearer ${accessToken}`)

		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			data: {
				id: expect.any(Number),
			},
		})
	})

	it("should not get user data without token", async () => {
		const response = await request(app.server).get("/me")

		expect(response.status).toBe(401)
	})

	it("should not get user data with invalid token", async () => {
		const response = await request(app.server)
			.get("/me")
			.set("Authorization", "Bearer invalid-token")

		expect(response.status).toBe(401)
	})
})
