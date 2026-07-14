import type { CreateStackDTO } from "../../../src/modules/stacks/dto/create-stack.dto"
import type { UpdateStackDTO } from "../../../src/modules/stacks/dto/update-stack.dto"
import type { Stack } from "../../../src/modules/stacks/entities/stack"
import type { StackRepository } from "../../../src/modules/stacks/repositories/stack.repository"

export class InMemoryStackRepository implements StackRepository {
	public stacks: Stack[] = []

	async create(data: CreateStackDTO): Promise<Stack> {
		const stack: Stack = {
			id: this.stacks.length + 1,
			...data,
		}

		this.stacks.push(stack)

		return stack
	}

	async delete(id: number): Promise<void> {
		this.stacks = this.stacks.filter((stack) => stack.id !== id)
	}

	async findById(id: number): Promise<Stack | null> {
		return this.stacks.find((stack) => stack.id === id) || null
	}

	async findByName(name: string): Promise<Stack | null> {
		return this.stacks.find((stack) => stack.name === name) || null
	}

	async findMany(): Promise<Stack[]> {
		return this.stacks
	}

	async findManyByIds(ids: number[]): Promise<Stack[]> {
		return this.stacks.filter((stack) => ids.includes(stack.id))
	}

	async update(data: UpdateStackDTO): Promise<Stack> {
		const index = this.stacks.findIndex((stack) => stack.id === data.id)

		this.stacks[index] = data

		return this.stacks[index]
	}
}
