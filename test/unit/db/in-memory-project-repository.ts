import type { CreateProjectDTO } from "../../../src/modules/projects/dto/create-project.dto.js"
import type { UpdateProjectDTO } from "../../../src/modules/projects/dto/update-project.dto.js"
import type { Project } from "../../../src/modules/projects/entities/project.js"
import type { ProjectRepository } from "../../../src/modules/projects/repositories/project.repository.js"
import type { StackRepository } from "../../../src/modules/stacks/repositories/stack.repository.js"

export class InMemoryProjectRepository implements ProjectRepository {
	public projects: Project[] = []

	constructor(private readonly stackRepository: StackRepository) {}

	async create(data: CreateProjectDTO): Promise<Project> {
		const { stackIds, ...projectData } = data

		const project: Project = {
			id: this.projects.length + 1,
			...projectData,
			stacks: await this.stackRepository.findManyByIds(stackIds),
		}

		this.projects.push(project)

		return project
	}

	async findById(id: number) {
		return this.projects.find((project) => project.id === id) ?? null
	}

	async findMany() {
		return [...this.projects]
	}

	async findByName(name: string) {
		return this.projects.find((project) => project.name === name) ?? null
	}

	async update(data: UpdateProjectDTO) {
		const index = this.projects.findIndex((project) => project.id === data.id)

		const { stackIds, ...projectData } = data

		this.projects[index] = {
			...projectData,
			stacks: await this.stackRepository.findManyByIds(stackIds),
		}

		return this.projects[index]
	}

	async delete(id: number) {
		this.projects = this.projects.filter((project) => project.id !== id)
	}
}
