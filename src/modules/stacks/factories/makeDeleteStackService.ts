import type { StackRepository } from "../repositories/stack.repository.js"
import { DeleteStackService } from "../services/delete-stack.service.js"

export function makeDeleteStackService(repository: StackRepository) {
	return new DeleteStackService(repository)
}
