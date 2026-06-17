import { app } from "./app.js"
import { env } from "./shared/lib/env.js"

try {
	app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
		app.log.info(`Server runing on port ${env.PORT}`)
	})
} catch (error) {
	console.log(error)
}
