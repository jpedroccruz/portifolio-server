import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const logoutSchema = {
	tags: ["Auth"],
	summary: "Logout",
	description: "POST /logout - make logout",
	body: z.object({
		token: z.string().min(1),
	}),
	response: {
		200: z.void(),
		401: errorSchema,
		500: errorSchema,
	},
}
