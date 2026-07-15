import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const createMessageSchema = {
	tags: ["Message"],
	summary: "Create Message",
	description: "POST /message - Create a message",
	body: z.object({
		name: z.string().min(3),
		email: z.email(),
		message: z.string().min(1),
	}),
	response: {
		204: z.void(),
		401: errorSchema,
		500: errorSchema,
	},
}
