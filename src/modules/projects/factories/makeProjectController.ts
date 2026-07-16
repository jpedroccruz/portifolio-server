import type { StackRepository } from "../../stacks/repositories/stack.repository.js"
import { ProjectController } from "../controllers/project.controller.js"
import type { ProjectRepository } from "../repositories/project.repository.js"
import { makeCreateProjectService } from "./makeCreateProjectService.js"
import { makeDeleteProjectService } from "./makeDeleteProjectService.js"
import { makeGetProjectByIdService } from "./makeGetProjectByIdService.js"
import { makeListProjectsService } from "./makeListProjectsService.js"
import { makeUpdateProjectService } from "./makeUpdateProjectService.js"

export function makeProjectController(
	projectRepository: ProjectRepository,
	stackRepository: StackRepository,
) {
	return new ProjectController(
		makeCreateProjectService(projectRepository, stackRepository),
		makeDeleteProjectService(projectRepository),
		makeGetProjectByIdService(projectRepository),
		makeListProjectsService(projectRepository),
		makeUpdateProjectService(projectRepository, stackRepository),
	)
}
