import { MessageController } from "../controllers/message.controller.js"
import { makeResendMailProvider } from "./makeResendMailProvider.js"
import { makeSendMessageService } from "./makeSendMessageService.js"

export function makeMessageController() {
	const provider = makeResendMailProvider()
	const service = makeSendMessageService(provider)

	return new MessageController(service)
}
