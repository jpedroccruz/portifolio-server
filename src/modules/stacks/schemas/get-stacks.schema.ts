import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { stackSchema } from "./stack.schema.js"

export const getStacksSchema = {
	tags: ["Stack"],
	summary: "Get Stacks",
	description: "GET /stacks - get all stacks",
	response: {
		200: z.object({ data: z.array(stackSchema) }),
		400: errorSchema,
		401: errorSchema,
		500: errorSchema,
	},
}
