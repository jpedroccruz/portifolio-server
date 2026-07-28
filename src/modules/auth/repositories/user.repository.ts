import type { User } from "../entities/user.js"

export interface UserRepository {
	findByName(name: string): Promise<User | null>
	findById(id: number): Promise<User | null>
}
