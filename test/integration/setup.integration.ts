import request from "supertest"
import { afterAll, beforeAll, beforeEach } from "vitest"
import { app } from "../../src/app.js"
import { hashPassword } from "../../src/shared/lib/hash-password.ts"
import { prisma } from "../../src/shared/prisma/prisma-client.js"

beforeAll(async () => {
	await app.ready()
})

afterAll(async () => {
	await app.close()
})

beforeEach(async () => {
	await prisma.project.deleteMany()
	await prisma.refreshToken.deleteMany()
	await prisma.stack.deleteMany()
	await prisma.user.deleteMany()
})

export async function getAccessToken(password: string) {
	await prisma.user.create({
		data: {
			username: "John Doe",
			passwordHash: await hashPassword(password),
		},
	})

	const login = await request(app.server).post("/login").send({
		name: "John Doe",
		password,
	})

	return login.body.data.accessToken as string
}
