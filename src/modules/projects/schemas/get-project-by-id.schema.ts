import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { projectSchema } from "./project.schema.js"

export const getProjectByIdSchema = {
	tags: ["Project"],
	summary: "Get Project By Id",
	description: "GET /projects/:id - get a project",
	params: z.object({
		id: z.coerce.number(),
	}),
	response: {
		201: z.object({ data: projectSchema }),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		500: errorSchema,
	},
}
