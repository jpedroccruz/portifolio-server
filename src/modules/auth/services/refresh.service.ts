import { BadRequestError } from "../../../shared/error/Errors.js"
import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"

export class RefreshService {
	constructor(
		private readonly tokenProvider: TokenProvider,
		private readonly refreshTokenRepository: RefreshTokenRepository,
	) {}

	async execute(data: string) {
		const payload = this.tokenProvider.verifyRefreshToken(data)

		const token = await this.refreshTokenRepository.findByTokenId(payload.jti)

		if (!token)
			throw new BadRequestError("Invalid token", "INVALID_REFRESH_TOKEN")

		await this.refreshTokenRepository.delete(payload.jti)

		const tokenId = crypto.randomUUID()

		const accessToken = this.tokenProvider.generateAccessToken(token.userId)

		const refreshToken = this.tokenProvider.generateRefreshToken(
			token.userId,
			tokenId,
		)

		await this.refreshTokenRepository.create({ userId: token.userId, tokenId })

		return {
			accessToken,
			refreshToken,
		}
	}
}
