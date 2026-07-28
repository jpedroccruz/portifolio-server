import { beforeEach, describe, expect, it } from "vitest"
import { RefreshService } from "../../../src/modules/auth/services/refresh.service"
import { InMemoryRefreshTokenRepository } from "../db/in-memory-refresh-token-repository"
import { FailingTokenProvider } from "./factories/failing-token-provider"
import { FakeTokenProvider } from "./factories/fake-token-provider"

describe("Refresh Service", () => {
	let refreshTokenRepository = new InMemoryRefreshTokenRepository()
	let tokenProvider = new FakeTokenProvider()

	let service = new RefreshService(tokenProvider, refreshTokenRepository)

	beforeEach(() => {
		refreshTokenRepository = new InMemoryRefreshTokenRepository()
		tokenProvider = new FakeTokenProvider()

		refreshTokenRepository.refreshTokens.push({
			id: 1,
			tokenId: "fake-token-id",
			userId: 1,
			createdAt: new Date(),
		})

		service = new RefreshService(tokenProvider, refreshTokenRepository)
	})

	it("should refresh tokens successfully", async () => {
		const result = await service.execute("fake-refresh-token")

		expect(result).toEqual({
			accessToken: expect.any(String),
			refreshToken: expect.any(String),
		})

		expect(refreshTokenRepository.refreshTokens).toHaveLength(1)
		expect(refreshTokenRepository.refreshTokens[0].tokenId).not.toBe(
			"fake-token-id",
		)
		expect(refreshTokenRepository.refreshTokens[0]).toMatchObject({
			userId: 1,
		})
	})

	it("should throw an error when refresh token does not exist", async () => {
		refreshTokenRepository.refreshTokens = []

		await expect(service.execute("invalid-token")).rejects.toMatchObject({
			code: "INVALID_REFRESH_TOKEN",
		})
	})

	it("should throw when token provider fails", async () => {
		const service = new RefreshService(
			new FailingTokenProvider(),
			refreshTokenRepository,
		)

		await expect(service.execute("invalid-token")).rejects.toMatchObject({
			code: "INVALID_REFRESH_TOKEN",
		})
	})
})
