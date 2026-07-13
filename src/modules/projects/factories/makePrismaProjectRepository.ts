import { prisma } from "../../../shared/prisma/prisma-client.js"
import { PrismaProjectRepository } from "../repositories/prisma-project.repository.js"

export function makePrismaProjectRepository() {
	return new PrismaProjectRepository(prisma)
}
