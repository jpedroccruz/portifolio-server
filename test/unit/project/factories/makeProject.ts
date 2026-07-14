import type { CreateProjectDTO } from "../../../../src/modules/projects/dto/create-project.dto"

export function makeProject(stackIds: number[]): CreateProjectDTO {
	return {
		name: `My Portfolio-${crypto.randomUUID()}`,
		description: "Any description",
		gitHubUrl: null,
		publishedAt: new Date(),
		thumbnailUrl: null,
		stackIds,
	}
}
