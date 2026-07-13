import type { StackRepository } from "../repositories/stack.repository.js"
import { ListStacksService } from "../services/list-stacks.service.js"

export function makeListStacksServiceStackService(repository: StackRepository) {
	return new ListStacksService(repository)
}
