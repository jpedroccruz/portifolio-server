import type { ProjectRepository } from "../repositories/project.repository.js"

export class ListProjectsService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	execute() {
		return this.projectRepository.findMany()
	}
}
