import { ConflictError } from "../../../shared/error/Errors.js"
import type { CreateProjectDTO } from "../dto/create-project.dto.js"
import type { ProjectRepository } from "../repositories/project.repository.js"

export class CreateProjectService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	async execute(data: CreateProjectDTO) {
		const projectAlreadyExists = await this.projectRepository.findByName(
			data.name,
		)

		if (projectAlreadyExists)
			throw new ConflictError(
				"This Project Already Exists.",
				"PROJECT_ALREADY_EXISTS",
			)

		return this.projectRepository.create(data)
	}
}
