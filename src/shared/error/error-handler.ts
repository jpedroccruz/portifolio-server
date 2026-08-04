import type { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { env } from "../lib/env.js"
import { AppError } from "./AppError.js"

export function errorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	if (error instanceof AppError) {
		return reply
			.code(error.statusCode)
			.send({ code: error.code, message: error.message })
	}

	if (error.validation) {
		return reply.code(400).send({
			code: "VALIDATION_ERROR",
			message: error.message,
		})
	}

	if (env.APP_ENV === "dev") request.log.error(error.message)

	return reply.code(500).send({
		code: "INTERNAL_SERVER_ERROR",
		message: "Internal server error.",
	})
}
