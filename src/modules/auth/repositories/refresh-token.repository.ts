import type { CreateRefreshTokenDTO } from "../dto/create-refresh-token.dto.js"
import type { RefreshToken } from "../entities/refresh-token.js"

export interface RefreshTokenRepository {
	create(data: CreateRefreshTokenDTO): Promise<RefreshToken>
	delete(tokenId: string): Promise<void>

	findByTokenId(tokenId: string): Promise<RefreshToken | null>
}
