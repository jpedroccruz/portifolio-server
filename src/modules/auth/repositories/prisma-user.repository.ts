import type { PrismaClient } from "@prisma/client"
import type { User } from "../entities/user.js"
import type { UserRepository } from "./user.repository.js"

export class PrismaUserRepository implements UserRepository {
	constructor(private readonly prisma: PrismaClient) {}

	findById(id: number): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				id,
			},
		})
	}

	findByName(name: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				username: name,
			},
		})
	}
}
