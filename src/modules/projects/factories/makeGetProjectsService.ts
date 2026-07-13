import type { ProjectRepository } from "../repositories/project.repository.js"
import { ListProjectsService } from "../services/list-projects.service.js"

export function makeGetProjectsService(repository: ProjectRepository) {
	return new ListProjectsService(repository)
}
