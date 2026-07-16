import type { Message } from "../../../../src/modules/message/entities/message"
import type { MailProvider } from "../../../../src/modules/message/providers/mail.provider"

export class FakeMailProvider implements MailProvider {
	public sentMails: Message[] = []

	async send(data: Message): Promise<void> {
		this.sentMails.push({
			name: data.name,
			from: data.from,
			text: data.text,
		})
	}
}
