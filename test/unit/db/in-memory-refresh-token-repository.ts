import type { CreateRefreshTokenDTO } from "../../../src/modules/auth/dto/create-refresh-token.dto"
import type { RefreshToken } from "../../../src/modules/auth/entities/refresh-token"
import type { RefreshTokenRepository } from "../../../src/modules/auth/repositories/refresh-token.repository"

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
	public refreshTokens: RefreshToken[] = []

	async create(data: CreateRefreshTokenDTO): Promise<RefreshToken> {
		const refreshToken: RefreshToken = {
			...data,
			id: this.refreshTokens.length + 1,
			createdAt: new Date(),
		}

		this.refreshTokens.push(refreshToken)

		return refreshToken
	}

	async delete(tokenId: string): Promise<void> {
		this.refreshTokens = this.refreshTokens.filter(
			(refreshToken) => refreshToken.tokenId !== tokenId,
		)
	}

	async findByTokenId(tokenId: string): Promise<RefreshToken | null> {
		return (
			this.refreshTokens.find(
				(refreshToken) => refreshToken.tokenId === tokenId,
			) || null
		)
	}
}
