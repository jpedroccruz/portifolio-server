import { AuthController } from "../controllers/auth.controller.js"
import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"
import type { UserRepository } from "../repositories/user.repository.js"
import { makeLoginService } from "./makeLoginService.js"
import { makeLogoutService } from "./makeLogoutService.js"
import { makeRefreshService } from "./makeRefreshService.js"

export function makeAuthController(
	tokenProvider: TokenProvider,
	userRepository: UserRepository,
	refreshTokenRepository: RefreshTokenRepository,
) {
	return new AuthController(
		makeLoginService(tokenProvider, userRepository, refreshTokenRepository),
		makeLogoutService(tokenProvider, refreshTokenRepository),
		makeRefreshService(tokenProvider, refreshTokenRepository),
	)
}
