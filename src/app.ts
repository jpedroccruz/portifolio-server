import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { routes } from "./routes/index.js"

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

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
	origin: ["http://localhost:3333"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
})

app.register(routes)
