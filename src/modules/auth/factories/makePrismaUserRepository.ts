import type { PrismaClient } from "@prisma/client"
import { PrismaUserRepository } from "../repositories/prisma-user.repository.js"

export function makePrismaUserRepository(prisma: PrismaClient) {
	return new PrismaUserRepository(prisma)
}
