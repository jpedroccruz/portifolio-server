import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeResendMailProvider } from "../factories/makeResendMailProvider.js"
import { makeSendMessageService } from "../factories/makeSendMessageService.js"
import type { createMessageSchema } from "../schemas/create-message.schema.js"

export class MessageController {
	create(
		request: FastifyRequest<{ Body: z.infer<typeof createMessageSchema.body> }>,
		reply: FastifyReply,
	) {
		const service = makeSendMessageService(makeResendMailProvider())
		service.execute(request.body)
		return reply.code(204).send()
	}
}
