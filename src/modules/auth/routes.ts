import type { AppInstance } from "../../app.js"
import { authHandler } from "../../shared/lib/auth-handler.js"
import { prisma } from "../../shared/prisma/prisma-client.js"
import { makeAuthController } from "./factories/makeAuthController.js"
import { FastifyTokenProvider } from "./providers/fastify-token.provider.js"
import { PrismaRefreshTokenRepository } from "./repositories/prisma-refresh-token.repository.js"
import { PrismaUserRepository } from "./repositories/prisma-user.repository.js"
import { loginSchema } from "./schemas/login.schema.js"
import { logoutSchema } from "./schemas/logout.schema.js"
import { refreshSchema } from "./schemas/refresh.schema.js"

export function authRoutes(app: AppInstance) {
	const tokenProvider = new FastifyTokenProvider(app)
	const userRepository = new PrismaUserRepository(prisma)
	const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
	const authController = makeAuthController(
		tokenProvider,
		userRepository,
		refreshTokenRepository,
	)

	app.post(
		"/login",
		{ schema: loginSchema },
		authController.login.bind(authController),
	)

	app.post(
		"/logout",
		{ schema: logoutSchema, onRequest: [authHandler] },
		authController.logout.bind(authController),
	)

	app.post(
		"/refresh",
		{ schema: refreshSchema },
		authController.refresh.bind(authController),
	)
}
