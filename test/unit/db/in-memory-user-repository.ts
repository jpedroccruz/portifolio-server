import type { User } from "../../../src/modules/auth/entities/user"
import type { UserRepository } from "../../../src/modules/auth/repositories/user.repository"

export class InMemoryUserRepository implements UserRepository {
	public users: User[] = []

	async findById(id: number): Promise<User | null> {
		return this.users.find((user) => user.id === id) || null
	}

	async findByName(name: string): Promise<User | null> {
		return this.users.find((user) => user.username === name) || null
	}
}
