import type { CreateProjectDTO } from "../dto/create-project.dto.js"
import type { UpdateProjectDTO } from "../dto/update-project.dto.js"
import type { Project } from "../entities/project.js"

export interface ProjectRepository {
	create(data: CreateProjectDTO): Promise<Project>
	update(id: number, data: UpdateProjectDTO): Promise<Project>
	delete(id: number): Promise<void>

	findMany(): Promise<Project[]>
	findById(id: number): Promise<Project | null>
}
