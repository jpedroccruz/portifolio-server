import { beforeEach, describe, expect, it } from "vitest"
import { LogoutService } from "../../../src/modules/auth/services/logout.service"
import { InMemoryRefreshTokenRepository } from "../db/in-memory-refresh-token-repository"
import { FailingTokenProvider } from "./factories/failing-token-provider"
import { FakeTokenProvider } from "./factories/fake-token-provider"

describe("Logout Service", () => {
	let refreshTokenRepository = new InMemoryRefreshTokenRepository()
	let tokenProvider = new FakeTokenProvider()

	let service = new LogoutService(tokenProvider, refreshTokenRepository)

	beforeEach(() => {
		refreshTokenRepository = new InMemoryRefreshTokenRepository()
		tokenProvider = new FakeTokenProvider()

		refreshTokenRepository.refreshTokens.push({
			id: 1,
			tokenId: "fake-token-id",
			userId: 1,
			createdAt: new Date(),
		})

		service = new LogoutService(tokenProvider, refreshTokenRepository)
	})

	it("should logout successfully", async () => {
		await service.execute("fake-refresh-token")

		expect(refreshTokenRepository.refreshTokens).toHaveLength(0)
	})

	it("should throw when refresh token is invalid", async () => {
		const service = new LogoutService(
			new FailingTokenProvider(),
			refreshTokenRepository,
		)

		await expect(service.execute("invalid-token")).rejects.toMatchObject({
			code: "INVALID_REFRESH_TOKEN",
		})
	})
})
