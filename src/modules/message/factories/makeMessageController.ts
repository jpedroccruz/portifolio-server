import { MessageController } from "../controllers/message.controller.js"
import type { MailProvider } from "../providers/mail.provider.js"
import { makeSendMessageService } from "./makeSendMessageService.js"

export function makeMessageController(provider: MailProvider) {
	const service = makeSendMessageService(provider)

	return new MessageController(service)
}
