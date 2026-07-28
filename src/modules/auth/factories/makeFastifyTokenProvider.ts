import type { FastifyInstance } from "fastify"
import { FastifyTokenProvider } from "../providers/fastify-token.provider.js"

export function makeFastifyTokenProvider(app: FastifyInstance) {
	return new FastifyTokenProvider(app)
}
