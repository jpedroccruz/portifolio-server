import type { FastifyInstance } from "fastify"
import { Resend } from "resend"
import { env } from "../../shared/lib/env.js"
import { makeMessageController } from "./factories/makeMessageController.js"
import { ResendMailProvider } from "./providers/resend-mail.provider.js"
import { createMessageSchema } from "./schemas/create-message.schema.js"

export function messageRoutes(app: FastifyInstance) {
	const mailProvider = new ResendMailProvider(new Resend(env.MAIL_PROVIDER_KEY))
	const messageController = makeMessageController(mailProvider)

	app.post(
		"/contact",
		{ schema: createMessageSchema },
		messageController.create.bind(messageController),
	)
}
