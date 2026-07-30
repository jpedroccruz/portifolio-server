import { BadRequestError } from "../../../shared/error/Errors.js"
import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"

export class RefreshService {
	constructor(
		private readonly tokenProvider: TokenProvider,
		private readonly refreshTokenRepository: RefreshTokenRepository,
	) {}

	async execute(data: string) {
		const { jti, sub } = this.tokenProvider.verifyRefreshToken(data)

		const token = await this.refreshTokenRepository.findByTokenId(jti)

		if (!token)
			throw new BadRequestError(
				"Invalid refresh token",
				"INVALID_REFRESH_TOKEN",
			)

		await this.refreshTokenRepository.delete(jti)

		const newJti = crypto.randomUUID()

		const newAccessToken = this.tokenProvider.generateAccessToken(sub)
		const newRefreshToken = this.tokenProvider.generateRefreshToken(sub, newJti)

		await this.refreshTokenRepository.create({
			userId: sub,
			tokenId: newJti,
		})

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		}
	}
}
