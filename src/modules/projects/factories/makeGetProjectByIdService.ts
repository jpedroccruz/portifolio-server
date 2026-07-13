import type { ProjectRepository } from "../repositories/project.repository.js"
import { GetProjectByIdService } from "../services/get-project-by-id.service.js"

export function makeGetProjectByIdService(repository: ProjectRepository) {
	return new GetProjectByIdService(repository)
}
