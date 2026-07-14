import type { StackRepository } from "../../../../src/modules/stacks/repositories/stack.repository"
import { InMemoryProjectRepository } from "../../db/in-memory-project-repository"

export function makeInMemoryProjectRepository(repository: StackRepository) {
	return new InMemoryProjectRepository(repository)
}
