import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const deleteStackSchema = {
	tags: ["Stack"],
	summary: "Delete Stack",
	description: "DELETE /stacks/:id - delete a stack",
	params: z.object({
		id: z.coerce.number(),
	}),
	response: {
		201: z.void(),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		500: errorSchema,
	},
}
