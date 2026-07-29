import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"
import { RefreshService } from "../services/refresh.service.js"

export function makeRefreshService(
	tokenProvider: TokenProvider,
	refreshTokenRepository: RefreshTokenRepository,
) {
	return new RefreshService(tokenProvider, refreshTokenRepository)
}
