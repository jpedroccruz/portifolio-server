import fastifyCors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import fastify from "fastify"
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { swaggerConfig } from "./docs/swagger.js"
import { routes } from "./routes/index.js"
import { errorHandler } from "./shared/error/error-handler.js"
import { env } from "./shared/lib/env.js"

export const app = fastify({
	logger: {
		transport: {
			level: "info",
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "yyyy-mm-dd HH:MM:ss",
				ignore: "pid,hostname",
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>()

export type AppInstance = typeof app

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifyCors, {
	origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
})

swaggerConfig(app)

app.register(routes)
