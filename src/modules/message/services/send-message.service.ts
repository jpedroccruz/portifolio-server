import { createHtmlMessage } from "../../../shared/lib/create-html-message.js"
import type { CreateMessageDTO } from "../dto/create-message.dto.js"
import type { MailProvider } from "../providers/mail.provider.js"

export class SendMessageService {
	constructor(private readonly provider: MailProvider) {}

	async execute(data: CreateMessageDTO) {
		await this.provider.send({
			name: data.name,
			from: data.email,
			text: createHtmlMessage(data),
		})
	}
}
