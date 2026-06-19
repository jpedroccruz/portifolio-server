import type { PrismaClient } from "@prisma/client"
import type { CreateProjectDTO } from "../dto/create-project.dto.js"
import type { UpdateProjectDTO } from "../dto/update-project.dto.js"
import type { Project } from "../entities/project.js"
import type { ProjectRepository } from "./project.repository.js"

export class PrismaProjectRepository implements ProjectRepository {
	constructor(private readonly prisma: PrismaClient) {
		this.prisma = prisma
	}

	async create(data: CreateProjectDTO): Promise<Project> {
		const { stackIds, ...projectData } = data

		return this.prisma.project.create({
			data: {
				...projectData,
				stacks: {
					connect: stackIds.map((id) => ({ id })),
				},
			},
			include: {
				stacks: true,
			},
		})
	}

	async update(id: number, data: UpdateProjectDTO): Promise<Project> {
		const { stackIds, ...projectData } = data

		return this.prisma.project.update({
			where: {
				id,
			},
			data: {
				...projectData,
				...(stackIds !== undefined && {
					stacks: {
						set: stackIds.map((id) => ({ id })),
					},
				}),
			},
			include: {
				stacks: true,
			},
		})
	}

	async delete(id: number): Promise<void> {
		await this.prisma.project.delete({
			where: {
				id,
			},
		})
	}

	async findMany(): Promise<Project[]> {
		return this.prisma.project.findMany({
			include: {
				stacks: true,
			},
		})
	}

	async findById(id: number): Promise<Project | null> {
		return this.prisma.project.findUnique({
			where: {
				id,
			},
			include: {
				stacks: true,
			},
		})
	}

	async findByName(name: string): Promise<Project | null> {
		return this.prisma.project.findUnique({
			where: {
				name,
			},
			include: {
				stacks: true,
			},
		})
	}
}
