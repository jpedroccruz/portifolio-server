import type { FastifyInstance } from "fastify"

export function routes(app: FastifyInstance) {
	app.register(
		() => {
			app.get("/", () => {
				return "Hello World"
			})
		},
		{ prefix: "/" },
	)
}
