import type { PrismaClient } from "@prisma/client"
import { PrismaRefreshTokenRepository } from "../repositories/prisma-refresh-token.repository.js"

export function makePrismaRefreshTokenRepository(prisma: PrismaClient) {
	return new PrismaRefreshTokenRepository(prisma)
}
