import { afterAll, beforeAll, beforeEach } from "vitest"
import { app } from "../../src/app.js"
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
