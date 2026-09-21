import type { FastifyRequest } from "fastify"
import { UnauthorizedError } from "../error/Errors.js"

export async function authHandler(request: FastifyRequest) {
	try {
		await request.jwtVerify()
	} catch (_error) {
		throw new UnauthorizedError("Invalid access token.", "INVALID_ACCESS")
	}
}
