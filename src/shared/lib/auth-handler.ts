import type { FastifyRequest } from "fastify"
import { ForbiddenError } from "../error/Errors.js"

export async function authHandler(request: FastifyRequest) {
	try {
		await request.jwtVerify()
	} catch (_error) {
		throw new ForbiddenError("Invalid access.", "INVALID_ACCESS")
	}
}
