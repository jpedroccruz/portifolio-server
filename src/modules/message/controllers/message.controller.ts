import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import type { createMessageSchema } from "../schemas/create-message.schema.js"
import type { SendMessageService } from "../services/send-message.service.js"

export class MessageController {
	constructor(private readonly sendMessageService: SendMessageService) {}

	async create(
		request: FastifyRequest<{ Body: z.infer<typeof createMessageSchema.body> }>,
		reply: FastifyReply,
	) {
		await this.sendMessageService.execute(request.body)
		return reply.code(204).send()
	}
}
