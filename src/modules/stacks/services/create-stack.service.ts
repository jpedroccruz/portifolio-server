import { ConflictError } from "../../../shared/error/Errors.js"
import type { CreateStackDTO } from "../dto/create-stack.dto.js"
import type { StackRepository } from "../repositories/stack.repository.js"

export class CreateStackService {
	constructor(private readonly stackRepository: StackRepository) {}

	async execute(data: CreateStackDTO) {
		const stack = await this.stackRepository.findByName(data.name)

		if (stack)
			throw new ConflictError(
				"This Project Already Exists.",
				"PROJECT_ALREADY_EXISTS",
			)

		return this.stackRepository.create(data)
	}
}
