import type { RefreshTokenPayload } from "../../../../src/modules/auth/entities/refresh-token-payload"
import type { TokenProvider } from "../../../../src/modules/auth/providers/token.provider"

export class FakeTokenProvider implements TokenProvider {
	generateAccessToken(): string {
		return "access-token"
	}

	generateRefreshToken(): string {
		return "refresh-token"
	}

	verifyRefreshToken(): RefreshTokenPayload {
		return {
			sub: 1,
			jti: "fake-token-id",
		}
	}
}
