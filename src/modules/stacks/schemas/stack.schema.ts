import z from "zod"

export const stackSchema = z.object({
	id: z.number(),
	name: z.string(),
	iconUrl: z.url(),
})
