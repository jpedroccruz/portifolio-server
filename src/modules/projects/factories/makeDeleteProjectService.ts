import type { ProjectRepository } from "../repositories/project.repository.js"
import { DeleteProjectService } from "../services/delete-project.service.js"

export function makeDeleteProjectService(repository: ProjectRepository) {
	return new DeleteProjectService(repository)
}
