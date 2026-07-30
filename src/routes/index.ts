import type { FastifyInstance } from "fastify"
import { authRoutes } from "../modules/auth/routes.js"

export function routes(app: FastifyInstance) {
	app.get("/health", () => "Hello World!")
	app.register(authRoutes)
}
