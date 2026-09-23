import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { env } from "../../../shared/lib/env.js"
import type { loginSchema } from "../schemas/login.schema.js"
import { logoutSchema } from "../schemas/logout.schema.js"
import type { meSchema } from "../schemas/me.schema.js"
import { refreshSchema } from "../schemas/refresh.schema.js"
import type { LoginService } from "../services/login.service.js"
import type { LogoutService } from "../services/logout.service.js"
import type { RefreshService } from "../services/refresh.service.js"

export class AuthController {
	constructor(
		private readonly loginService: LoginService,
		private readonly logoutService: LogoutService,
		private readonly refreshService: RefreshService,
	) {}

	async me(
		request: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof meSchema.response)["200"]>
		}>,
	) {
		return await reply.code(200).send({
			data: {
				id: request.user.sub,
			},
		})
	}

	async login(
		request: FastifyRequest<{ Body: z.infer<typeof loginSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof loginSchema.response)["200"]>
		}>,
	) {
		const { accessToken, refreshToken } = await this.loginService.execute(
			request.body,
		)
		return reply
			.code(200)
			.setCookie("refreshToken", refreshToken, {
				httpOnly: true,
				path: "/",
				sameSite: "lax",
				secure: env.APP_ENV === "prod",
				maxAge: 60 * 60 * 24 * 30,
			})
			.send({ data: { accessToken } })
	}

	async logout(
		request: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof logoutSchema.response)["200"]>
		}>,
	) {
		const { refreshToken } = logoutSchema.cookie.parse(request.cookies)

		await this.logoutService.execute(refreshToken)
		return reply.code(200).clearCookie("refreshToken").send()
	}

	async refresh(
		request: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof refreshSchema.response)["200"]>
		}>,
	) {
		const { refreshToken } = refreshSchema.cookie.parse(request.cookies)

		const tokens = await this.refreshService.execute(refreshToken)

		return reply
			.code(200)
			.setCookie("refreshToken", tokens.refreshToken, {
				httpOnly: true,
				path: "/",
				sameSite: "lax",
				secure: env.APP_ENV === "prod",
				maxAge: 60 * 60 * 24 * 30,
			})
			.send({ data: { accessToken: tokens.accessToken } })
	}
}
