export type UpdateProjectDTO = {
	id: number
	name: string
	description: string
	gitHubUrl: string | null
	publishedAt: Date
	thumbnailUrl: string | null
	stackIds: number[]
}
