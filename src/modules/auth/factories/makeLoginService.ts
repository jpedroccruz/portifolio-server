import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"
import type { UserRepository } from "../repositories/user.repository.js"
import { LoginService } from "../services/login.service.js"

export function makeLoginService(
	tokenProvider: TokenProvider,
	userRepository: UserRepository,
	refreshTokenRepository: RefreshTokenRepository,
) {
	return new LoginService(tokenProvider, userRepository, refreshTokenRepository)
}
