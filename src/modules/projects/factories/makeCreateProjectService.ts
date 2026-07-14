import type { StackRepository } from "../../stacks/repositories/stack.repository.js"
import type { ProjectRepository } from "../repositories/project.repository.js"
import { CreateProjectService } from "../services/create-project.service.js"

export function makeCreateProjectService(
	projectRepository: ProjectRepository,
	stackRepository: StackRepository,
) {
	return new CreateProjectService(projectRepository, stackRepository)
}
