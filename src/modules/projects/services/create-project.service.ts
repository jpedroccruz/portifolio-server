import { ConflictError, NotFoundError } from "../../../shared/error/Errors.js"
import type { StackRepository } from "../../stacks/repositories/stack.repository.js"
import type { CreateProjectDTO } from "../dto/create-project.dto.js"
import type { ProjectRepository } from "../repositories/project.repository.js"

export class CreateProjectService {
	constructor(
		private readonly projectRepository: ProjectRepository,
		private readonly stackRepository: StackRepository,
	) {}

	async execute(data: CreateProjectDTO) {
		const projectAlreadyExists = await this.projectRepository.findByName(
			data.name,
		)

		if (projectAlreadyExists)
			throw new ConflictError(
				"This Project Already Exists.",
				"PROJECT_ALREADY_EXISTS",
			)

		const stacks = await this.stackRepository.findManyByIds(data.stackIds)

		if (stacks.length !== data.stackIds.length)
			throw new NotFoundError(
				"One Or More Stacks Were Not Found",
				"STACK_NOT_FOUND",
			)

		return this.projectRepository.create(data)
	}
}
