import { beforeEach, describe, expect, it } from "vitest"
import { LoginService } from "../../../src/modules/auth/services/login.service"
import { InMemoryRefreshTokenRepository } from "../db/in-memory-refresh-token-repository"
import { InMemoryUserRepository } from "../db/in-memory-user-repository"
import { FakeTokenProvider } from "./factories/fake-token-provider"

describe("Login Service", () => {
	let userRepository = new InMemoryUserRepository()
	let refreshTokenRepository = new InMemoryRefreshTokenRepository()
	let tokenProvider = new FakeTokenProvider()

	let service = new LoginService(
		tokenProvider,
		userRepository,
		refreshTokenRepository,
	)

	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		refreshTokenRepository = new InMemoryRefreshTokenRepository()
		tokenProvider = new FakeTokenProvider()

		userRepository.users[0] = {
			id: 1,
			username: "John Doe",
			passwordHash:
				"$2a$12$Z28xbKTdvXjOpC5nUUvp5.7vRLs6bypnD9IrTTkLx/FkRUuxZkGje",
		}

		service = new LoginService(
			tokenProvider,
			userRepository,
			refreshTokenRepository,
		)
	})

	it("should login successfully", async () => {
		const result = await service.execute({
			name: "John Doe",
			password: "123456",
		})

		expect(result).toEqual({
			accessToken: expect.any(String),
			refreshToken: expect.any(String),
		})

		expect(refreshTokenRepository.refreshTokens).toHaveLength(1)
	})

	it("should not login with an invalid email", async () => {
		await expect(
			service.execute({
				name: "Harry Doe",
				password: "123456",
			}),
		).rejects.toMatchObject({
			code: "INVALID_CREDENTIALS",
		})
	})

	it("should not login with an invalid password", async () => {
		await expect(
			service.execute({
				name: "John Doe",
				password: "1234567",
			}),
		).rejects.toMatchObject({
			code: "INVALID_CREDENTIALS",
		})
	})
})
