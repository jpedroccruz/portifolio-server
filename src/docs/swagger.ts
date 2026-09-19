import fastifySwagger from "@fastify/swagger"
import scalarFastifyPlugin from "@scalar/fastify-api-reference"
import type { FastifyInstance } from "fastify"
import { jsonSchemaTransform } from "fastify-type-provider-zod"

export const swaggerConfig = (app: FastifyInstance) => {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Portifiolio API Reference",
				description:
					"API for managing stacks and projects for @jpedroccruz Portifiolio",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
	})

	app.register(scalarFastifyPlugin, {
		routePrefix: "/docs",
		configuration: {
			theme: "kepler",
			pageTitle: "jpedroccruz | API Reference",
		},
	})
}
