import type { PrismaClient } from "@prisma/client"
import type { CreateStackDTO } from "../dto/create-stack.dto.js"
import type { UpdateStackDTO } from "../dto/update-stack.dto.js"
import type { Stack } from "../entities/stack.js"
import type { StackRepository } from "./stack.repository.js"

export class PrismaStackRepository implements StackRepository {
	constructor(private readonly prisma: PrismaClient) {}

	create(data: CreateStackDTO): Promise<Stack> {
		return this.prisma.stack.create({
			data,
		})
	}

	async delete(id: number): Promise<void> {
		await this.prisma.stack.delete({
			where: {
				id,
			},
		})
	}

	findById(id: number): Promise<Stack | null> {
		return this.prisma.stack.findFirst({
			where: {
				id,
			},
		})
	}

	findManyByIds(ids: number[]): Promise<Stack[]> {
		return this.prisma.stack.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		})
	}

	findByName(name: string): Promise<Stack | null> {
		return this.prisma.stack.findFirst({
			where: {
				name,
			},
		})
	}

	findMany(): Promise<Stack[]> {
		return this.prisma.stack.findMany()
	}

	update(data: UpdateStackDTO): Promise<Stack> {
		return this.prisma.stack.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}
