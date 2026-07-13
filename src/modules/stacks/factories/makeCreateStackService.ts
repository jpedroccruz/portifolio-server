import type { StackRepository } from "../repositories/stack.repository.js"
import { CreateStackService } from "../services/create-stack.service.js"

export function makeCreateStackService(repository: StackRepository) {
	return new CreateStackService(repository)
}
