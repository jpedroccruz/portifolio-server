import type { MailProvider } from "../providers/mail.provider.js"
import { SendMessageService } from "../services/send-message.service.js"

export function makeSendMessageService(mailProvider: MailProvider) {
	return new SendMessageService(mailProvider)
}
