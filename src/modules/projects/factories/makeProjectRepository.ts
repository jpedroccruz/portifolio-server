import { prisma } from "../../../shared/prisma/prisma-client.js"
import { PrismaProjectRepository } from "../repositories/prisma-project.repository.js"

export function makeProjectRepository() {
	return new PrismaProjectRepository(prisma)
}
