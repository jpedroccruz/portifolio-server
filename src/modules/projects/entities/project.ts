import type { Stack } from "@prisma/client"

export type Project = {
	id: number
	name: string
	description: string
	gitHubUrl: string | null
	publishedAt: Date
	thumbnailUrl: string | null

	stacks: Stack[]
}
