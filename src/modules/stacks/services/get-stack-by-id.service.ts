import { NotFoundError } from "../../../shared/error/Errors.js"
import type { StackRepository } from "../repositories/stack.repository.js"

export class GetStackByIdService {
	constructor(private readonly stackRepository: StackRepository) {}

	async execute(id: number) {
		const stack = await this.stackRepository.findById(id)

		if (!stack)
			throw new NotFoundError("This Stack Does Not Exist.", "STACK_NOT_FOUND")

		return stack
	}
}
