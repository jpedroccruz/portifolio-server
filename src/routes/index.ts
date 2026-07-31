import type { FastifyInstance } from "fastify"
import { authRoutes } from "../modules/auth/routes.js"
import { messageRoutes } from "../modules/message/routes.js"
import { projectRoutes } from "../modules/projects/routes.js"
import { stackRoutes } from "../modules/stacks/routes.js"

export function routes(app: FastifyInstance) {
	app.get("/health", () => "Hello World!")
	app.register(authRoutes)
	app.register(stackRoutes)
	app.register(projectRoutes)
	app.register(messageRoutes)
}
