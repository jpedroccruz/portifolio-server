export type UpdateProjectDTO = {
	id: number
	name: string
	description: string
	gitHubUrl: string
	publishedAt: Date
	thumbnailUrl: string
	stackIds: number[]
}
