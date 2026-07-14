import type { StackRepository } from "../../stacks/repositories/stack.repository.js"
import type { ProjectRepository } from "../repositories/project.repository.js"
import { UpdateProjectService } from "../services/update-project.service.js"

export function makeUpdateProjectService(
	projectRepository: ProjectRepository,
	stackRepository: StackRepository,
) {
	return new UpdateProjectService(projectRepository, stackRepository)
}
