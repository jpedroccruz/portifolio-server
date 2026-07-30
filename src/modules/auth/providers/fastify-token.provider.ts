import type { FastifyInstance } from "fastify"
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
		return this.app.jwt.verify(refreshToken)
	}
}
