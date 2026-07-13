import z from "zod"
import { errorSchema } from "../../../shared/schema/error.schema.js"
import { stackSchema } from "./stack.schema.js"

export const createStackSchema = {
	tags: ["Stack"],
	summary: "Create Stack",
	description: "POST /stacks - create a stack",
	body: z.object({
		name: z.string(),
		iconUrl: z.url(),
	}),
	response: {
		201: z.object({ data: stackSchema }),
		400: errorSchema,
		401: errorSchema,
		409: errorSchema,
		500: errorSchema,
	},
}
