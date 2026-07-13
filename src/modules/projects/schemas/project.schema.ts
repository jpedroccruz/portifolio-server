import z from "zod"

export const projectSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	gitHubUrl: z.url().nullable(),
	publishedAt: z.coerce.date(),
	thumbnailUrl: z.url().nullable(),
	stacks: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			iconUrl: z.url(),
		}),
	),
})
