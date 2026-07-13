import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"

export const deleteProjectSchema = {
	tags: ["Project"],
	summary: "Delete Project",
	description: "Delete /projects/:id - delete a project",
	params: z.object({
		id: z.coerce.number(),
	}),
	response: {
		204: z.void(),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		500: errorSchema,
	},
}
