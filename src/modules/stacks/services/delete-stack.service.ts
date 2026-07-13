import { ConflictError } from "../../../shared/error/Errors.js"
import type { StackRepository } from "../repositories/stack.repository.js"

export class DeleteStackService {
	constructor(private readonly stackRepository: StackRepository) {}

	async execute(id: number) {
		const stack = await this.stackRepository.findById(id)

		if (!stack)
			throw new ConflictError("This Stack Does Not Exists.", "STACK_NOT_FOUND")

		return this.stackRepository.delete(id)
	}
}
