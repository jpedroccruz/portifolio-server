import type { MailProvider } from "../../../../src/modules/message/providers/mail.provider"
import { InternalServerError } from "../../../../src/shared/error/Errors"

export class FailingMailProvider implements MailProvider {
	async send(): Promise<void> {
		throw new InternalServerError(
			"Failed to send message.",
			"MESSAGE_SEND_FAILED",
		)
	}
}
