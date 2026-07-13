import type { ProjectRepository } from "../repositories/project.repository.js"
import { CreateProjectService } from "../services/create-project.service.js"

export function makeCreateProjectService(repository: ProjectRepository) {
	return new CreateProjectService(repository)
}
