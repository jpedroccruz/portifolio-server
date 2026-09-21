import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const meSchema = {
	tags: ["Auth"],
	summary: "Me",
	description: "GET /me - get authenticated user data",
	response: {
		200: z.object({
			data: z.object({ id: z.number() }),
		}),
		401: errorSchema,
		500: errorSchema,
	},
}
