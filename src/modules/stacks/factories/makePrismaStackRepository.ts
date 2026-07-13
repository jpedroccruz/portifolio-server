import { prisma } from "../../../shared/prisma/prisma-client.js"
import { PrismaStackRepository } from "../repositories/prisma-stack.repository.js"

export function makePrismaStackRepository() {
	return new PrismaStackRepository(prisma)
}
