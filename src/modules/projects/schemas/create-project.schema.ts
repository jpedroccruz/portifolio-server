import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { projectSchema } from "./project.schema.js"

export const createProjectSchema = {
	tags: ["Project"],
	summary: "Create Project",
	description: "POST /projects - create a project",
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
		409: errorSchema,
		500: errorSchema,
	},
}
