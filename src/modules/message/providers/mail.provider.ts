import type { Message } from "../entities/message.js"

export interface MailProvider {
	send(data: Message): Promise<void>
}
