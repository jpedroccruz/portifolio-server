import { BadRequestError } from "../../../shared/error/Errors.js"
import { comparePassword } from "../../../shared/lib/compare-password.js"
import type { MakeLoginDTO } from "../dto/make-login.dto.js"
import type { TokenProvider } from "../providers/token.provider.js"
import type { RefreshTokenRepository } from "../repositories/refresh-token.repository.js"
import type { UserRepository } from "../repositories/user.repository.js"

export class LoginService {
	constructor(
		private readonly tokenProvider: TokenProvider,
		private readonly userRepository: UserRepository,
		private readonly refreshTokenRepository: RefreshTokenRepository,
	) {}

	async execute(data: MakeLoginDTO) {
		const user = await this.userRepository.findByName(data.name)

		if (!user)
			throw new BadRequestError(
				"Invalid user or password.",
				"INVALID_CREDENTIALS",
			)

		const isPasswordValid = await comparePassword(
			data.password,
			user.passwordHash,
		)

		if (!isPasswordValid)
			throw new BadRequestError(
				"Invalid user or password.",
				"INVALID_CREDENTIALS",
			)

		const tokenId = crypto.randomUUID()

		const accessToken = this.tokenProvider.generateAccessToken(user.id)

		const refreshToken = this.tokenProvider.generateRefreshToken(
			user.id,
			tokenId,
		)

		await this.refreshTokenRepository.create({ userId: user.id, tokenId })

		return {
			accessToken,
			refreshToken,
		}
	}
}
