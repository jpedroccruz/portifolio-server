import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { stackSchema } from "./stack.schema.js"

export const updateStackSchema = {
	tags: ["Stack"],
	summary: "Update Stack",
	description: "PUT /stacks/:id - update a stack",
	params: z.object({
		id: z.coerce.number(),
	}),
	body: z.object({
		name: z.string(),
		iconUrl: z.url(),
	}),
	response: {
		200: z.object({ data: stackSchema }),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		409: errorSchema,
		500: errorSchema,
	},
}
