import { createHtmlMessage } from "../../../shared/lib/create-html-message.js"
import { env } from "../../../shared/lib/env.js"
import type { CreateMessageDTO } from "../dto/create-message.dto.js"
import type { MailProvider } from "../providers/mail.provider.js"

export class SendMessageService {
	constructor(private readonly provider: MailProvider) {}

	execute(data: CreateMessageDTO) {
		this.provider.send({
			name: data.name,
			from: data.email,
			to: env.EMAIL,
			text: createHtmlMessage(data),
		})
	}
}
