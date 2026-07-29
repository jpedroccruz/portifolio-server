import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const refreshSchema = {
	tags: ["Auth"],
	summary: "Refresh token",
	description: "POST /refresh - generate another token",
	body: z.object({
		token: z.string().min(1),
	}),
	response: {
		200: z.object({
			data: z.object({ accessToken: z.string(), refreshToken: z.string() }),
		}),
		400: errorSchema,
		500: errorSchema,
	},
}
