import { NotFoundError } from "../../../shared/error/Errors.js"
import type { ProjectRepository } from "../repositories/project.repository.js"

export class GetProjectByIdService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	async execute(id: number) {
		const project = await this.projectRepository.findById(id)

		if (!project)
			throw new NotFoundError(
				"This Project Does Not Exist.",
				"PROJECT_DOES_NOT_EXIST",
			)

		return project
	}
}
