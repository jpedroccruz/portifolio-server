import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { projectSchema } from "./project.schema.js"

export const getProjectsSchema = {
	tags: ["Project"],
	summary: "Get All Projects",
	description: "GET /projects - get all projects",
	response: {
		200: z.object({ data: z.array(projectSchema) }),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		500: errorSchema,
	},
}
