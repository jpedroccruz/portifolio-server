import { prisma } from "../../../shared/prisma/prisma-client.js"
import { PrismaStackRepository } from "../repositories/prisma-stack.repository.js"
import { ListStacksService } from "../services/list-stacks.service.js"

export function makePrismaStackRepository() {
	const repository = new PrismaStackRepository(prisma)
	return new ListStacksService(repository)
}
