import { describe, expect, it } from "vitest"
import { SendMessageService } from "../../../src/modules/message/services/send-message.service"
import { createHtmlMessage } from "../../../src/shared/lib/create-html-message"
import { FailingMailProvider } from "./factories/failingMailProvider"
import { FakeMailProvider } from "./factories/fakeMailProvider"

describe("Send Message Service", () => {
	it("should send an email", () => {
		const mailProvider = new FakeMailProvider()

		const service = new SendMessageService(mailProvider)

		const data = {
			name: "John Doe",
			email: "test@example.com",
			message: "Hello World!",
		}

		service.execute(data)

		expect(mailProvider.sentMails).toHaveLength(1)
		expect(mailProvider.sentMails[0]).toMatchObject({
			name: "John Doe",
			from: "test@example.com",
			text: createHtmlMessage(data),
		})
	})

	it("should throw when mail provider fails", async () => {
		const service = new SendMessageService(new FailingMailProvider())

		await expect(
			service.execute({
				name: "John Doe",
				email: "test@example.com",
				message: "Hello World!",
			}),
		).rejects.toMatchObject({
			message: "Failed to send message.",
			code: "MESSAGE_SEND_FAILED",
		})
	})
})
