import { Resend } from "resend"
import { env } from "../../../shared/lib/env.js"
import { ResendMailProvider } from "../providers/resend-mail.provider.js"

export function makeResendMailProvider() {
	const resend = new Resend(env.MAIL_PROVIDER_KEY)
	return new ResendMailProvider(resend)
}
