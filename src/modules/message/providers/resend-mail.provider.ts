import type { Resend } from "resend"
import { InternalServerError } from "../../../shared/error/Errors.js"
import type { Message } from "../entities/message.js"
import type { MailProvider } from "./mail.provider.js"

export class ResendMailProvider implements MailProvider {
	constructor(private readonly resend: Resend) {}

	async send(data: Message): Promise<void> {
		const { data: _, error } = await this.resend.emails.send({
			from: data.from,
			to: data.to,
			subject: "New Portifolio Contact",
			html: data.text,
		})

		if (error)
			throw new InternalServerError(
				"Failed to send message.",
				"MESSAGE_SEND_FAILED",
			)
	}
}
