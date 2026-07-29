import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import type { loginSchema } from "../schemas/login.schema.js"
import type { logoutSchema } from "../schemas/logout.schema.js"
import type { refreshSchema } from "../schemas/refresh.schema.js"
import type { LoginService } from "../services/login.service.js"
import type { LogoutService } from "../services/logout.service.js"
import type { RefreshService } from "../services/refresh.service.js"

export class AuthController {
	constructor(
		private readonly loginService: LoginService,
		private readonly logoutService: LogoutService,
		private readonly refreshService: RefreshService,
	) {}

	async login(
		request: FastifyRequest<{ Body: z.infer<typeof loginSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof loginSchema.response)["200"]>
		}>,
	) {
		const tokens = await this.loginService.execute(request.body)
		return reply.code(200).send({ data: tokens })
	}

	async logout(
		request: FastifyRequest<{ Body: z.infer<typeof logoutSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof logoutSchema.response)["200"]>
		}>,
	) {
		await this.logoutService.execute(request.body.token)
		return reply.code(200).send()
	}

	async refresh(
		request: FastifyRequest<{ Body: z.infer<typeof refreshSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof refreshSchema.response)["200"]>
		}>,
	) {
		const tokens = await this.refreshService.execute(request.body.token)
		return reply.code(200).send({ data: tokens })
	}
}
