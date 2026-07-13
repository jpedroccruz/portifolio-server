import { ConflictError, NotFoundError } from "../../../shared/error/Errors.js"
import type { UpdateProjectDTO } from "../dto/update-project.dto.js"
import type { ProjectRepository } from "../repositories/project.repository.js"

export class UpdateProjectService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	async execute(data: UpdateProjectDTO) {
		const project = await this.projectRepository.findById(data.id)

		if (!project)
			throw new NotFoundError(
				"This Project Does Not Exist.",
				"PROJECT_DOES_NOT_EXIST",
			)

		const projectExists = await this.projectRepository.findByName(data.name)

		if (projectExists && data.id !== projectExists.id)
			throw new ConflictError(
				"This Project Name Already Exist.",
				"PROJECT_NAME_ALREADY_EXISTS",
			)

		return await this.projectRepository.update(data)
	}
}
