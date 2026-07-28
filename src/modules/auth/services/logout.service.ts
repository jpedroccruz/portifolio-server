import { UnauthorizedError } from "../../../shared/error/Errors.js"
import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"

export class LogoutService {
	constructor(
		private readonly tokenProvider: TokenProvider,
		private readonly refreshTokenRepository: RefreshTokenRepository,
	) {}

	async execute(refreshToken: string) {
		const { jti } = this.tokenProvider.verifyRefreshToken(refreshToken)

		const token = this.refreshTokenRepository.findByTokenId(jti)

		if (!token)
			throw new UnauthorizedError(
				"Invalid Refresh Token.",
				"INVALID_REFRESH_TOKEN",
			)

		this.refreshTokenRepository.delete(jti)
	}
}
