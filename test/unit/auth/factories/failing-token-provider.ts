import type { TokenProvider } from "../../../../src/modules/auth/providers/token.provider"
import { UnauthorizedError } from "../../../../src/shared/error/Errors"

export class FailingTokenProvider implements TokenProvider {
	generateAccessToken(): string {
		throw new Error("Not implemented")
	}

	generateRefreshToken(): string {
		throw new Error("Not implemented")
	}

	verifyRefreshToken(): never {
		throw new UnauthorizedError(
			"Invalid refresh token.",
			"INVALID_REFRESH_TOKEN",
		)
	}
}
