import type { FastifyInstance } from "fastify"
import { UnauthorizedError } from "../../../shared/error/Errors.js"
import type { RefreshTokenPayload } from "../entities/refresh-token-payload.js"
import type { TokenProvider } from "./token.provider.js"

export class FastifyTokenProvider implements TokenProvider {
	constructor(private readonly app: FastifyInstance) {}

	generateAccessToken(userId: number): string {
		return this.app.jwt.sign(
			{
				sub: userId,
			},
			{
				expiresIn: "15m",
			},
		)
	}

	generateRefreshToken(userId: number, jti: string): string {
		return this.app.jwt.sign(
			{
				sub: userId,
				jti,
			},
			{
				expiresIn: "7d",
			},
		)
	}

	verifyRefreshToken(refreshToken: string): RefreshTokenPayload {
		try {
			return this.app.jwt.verify(refreshToken)
		} catch (_error) {
			throw new UnauthorizedError(
				"Invalid refresh token.",
				"INVALID_REFRESH_TOKEN",
			)
		}
	}
}
