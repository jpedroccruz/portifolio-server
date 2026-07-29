import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"
import { LogoutService } from "../services/logout.service.js"

export function makeLogoutService(
	tokenProvider: TokenProvider,
	refreshTokenRepository: RefreshTokenRepository,
) {
	return new LogoutService(tokenProvider, refreshTokenRepository)
}
