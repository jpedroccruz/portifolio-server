import { uuid } from "zod"
import type { CreateProjectDTO } from "../../../../src/modules/projects/dto/create-project.dto"

export function makeProject(stackIds: number[]): CreateProjectDTO {
	return {
		name: `My Portfolio-${uuid}`,
		description: "Any description",
		gitHubUrl: null,
		publishedAt: new Date(),
		thumbnailUrl: null,
		stackIds,
	}
}
