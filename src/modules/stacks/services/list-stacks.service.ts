import type { StackRepository } from "../repositories/stack.repository.js"

export class ListStacksService {
	constructor(private readonly stackRepository: StackRepository) {}

	execute() {
		return this.stackRepository.findMany()
	}
}
