import type { CreateStackDTO } from "../dto/create-stack.dto.js"
import type { UpdateStackDTO } from "../dto/update-stack.dto.js"
import type { Stack } from "../entities/stack.js"

export interface StackRepository {
	create(data: CreateStackDTO): Promise<Stack>
	update(data: UpdateStackDTO): Promise<Stack>
	delete(id: number): Promise<void>

	findMany(): Promise<Stack[]>
	findManyByIds(ids: number[]): Promise<Stack[]>
	findById(id: number): Promise<Stack | null>
	findByName(name: string): Promise<Stack | null>
}
