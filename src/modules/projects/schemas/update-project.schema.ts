import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { projectSchema } from "./project.schema.js"

export const updateProjectSchema = {
	tags: ["Project"],
	summary: "Update Project",
	description: "PUT /projects/:id - update a project",
	params: z.object({
		id: z.coerce.number(),
	}),
	body: z.object({
		name: z.string().min(3),
		description: z.string().min(5),
		gitHubUrl: z.url().nullable(),
		publishedAt: z.coerce.date(),
		thumbnailUrl: z.url().nullable(),
		stackIds: z.array(z.number()).min(1),
	}),
	response: {
		201: z.object({ data: projectSchema }),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		409: errorSchema,
		500: errorSchema,
	},
}
