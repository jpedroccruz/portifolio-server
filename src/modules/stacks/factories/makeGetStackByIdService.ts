import type { StackRepository } from "../repositories/stack.repository.js"
import { GetStackByIdService } from "../services/get-stack-by-id.service.js"

export function makeGetStackByIdService(repository: StackRepository) {
	return new GetStackByIdService(repository)
}
