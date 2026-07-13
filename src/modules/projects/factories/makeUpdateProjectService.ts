import type { ProjectRepository } from "../repositories/project.repository.js"
import { UpdateProjectService } from "../services/update-project.service.js"

export function makeUpdateProjectService(repository: ProjectRepository) {
	return new UpdateProjectService(repository)
}
