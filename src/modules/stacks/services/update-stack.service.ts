import { ConflictError, NotFoundError } from "../../../shared/error/Errors.js"
import type { UpdateStackDTO } from "../dto/update-stack.dto.js"
import type { StackRepository } from "../repositories/stack.repository.js"

export class UpdateStackService {
	constructor(private readonly stackRepository: StackRepository) {}

	async execute(data: UpdateStackDTO) {
		const stack = await this.stackRepository.findById(data.id)

		if (!stack)
			throw new NotFoundError("This Stack Does Not Exist.", "STACK_NOT_FOUND")

		const stackExists = await this.stackRepository.findByName(data.name)

		if (stackExists && data.id !== stackExists.id)
			throw new ConflictError(
				"This Stack Name Already Exist.",
				"STACK_ALREADY_EXISTS",
			)

		return await this.stackRepository.update(data)
	}
}
