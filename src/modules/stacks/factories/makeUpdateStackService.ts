import type { StackRepository } from "../repositories/stack.repository.js"
import { UpdateStackService } from "../services/update-stack.service.js"

export function makeUpdateStackService(repository: StackRepository) {
	return new UpdateStackService(repository)
}
