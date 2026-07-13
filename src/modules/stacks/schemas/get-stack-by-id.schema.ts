import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { stackSchema } from "./stack.schema.js"

export const getStackByIdSchema = {
	tags: ["Stack"],
	summary: "Get Stack By Id",
	description: "GET /stacks/:id - get a stack",
	params: z.object({
		id: z.number(),
	}),
	response: {
		200: z.object({ data: stackSchema }),
		400: errorSchema,
		401: errorSchema,
		404: errorSchema,
		500: errorSchema,
	},
}
