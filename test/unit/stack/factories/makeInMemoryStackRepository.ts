import { InMemoryStackRepository } from "../db/in-memory-stack-repository"

export function makeInMemoryStackRepository() {
	return new InMemoryStackRepository()
}
