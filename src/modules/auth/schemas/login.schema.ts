import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const loginSchema = {
	tags: ["Auth"],
	summary: "Login",
	description: "POST /login - make login",
	body: z.object({
		name: z.string().min(3),
		password: z.string().min(5),
	}),
	response: {
		200: z.object({
			data: z.object({ accessToken: z.string(), refreshToken: z.string() }),
		}),
		400: errorSchema,
		500: errorSchema,
	},
}
