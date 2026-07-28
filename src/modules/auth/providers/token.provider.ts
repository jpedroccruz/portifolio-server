import type { RefreshTokenPayload } from "../entities/refresh-token-payload.js"

export interface TokenProvider {
	generateAccessToken(userId: number): string
	generateRefreshToken(userId: number, tokenId: string): string
	verifyRefreshToken(token: string): RefreshTokenPayload
}
