import type { PrismaClient } from "@prisma/client"
import type { CreateRefreshTokenDTO } from "../dto/create-refresh-token.dto.js"
import type { RefreshToken } from "../entities/refresh-token.js"
import type { RefreshTokenRepository } from "./refresh-token.repository.js"

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
	constructor(private readonly prisma: PrismaClient) {}

	create(data: CreateRefreshTokenDTO): Promise<RefreshToken> {
		return this.prisma.refreshToken.create({
			data,
		})
	}

	async delete(tokenId: string): Promise<void> {
		this.prisma.refreshToken.delete({
			where: {
				tokenId,
			},
		})
	}

	async findByTokenId(tokenId: string): Promise<RefreshToken | null> {
		return this.prisma.refreshToken.findFirst({
			where: {
				tokenId,
			},
		})
	}
}
