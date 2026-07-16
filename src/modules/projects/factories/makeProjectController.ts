import type { StackRepository } from "../../stacks/repositories/stack.repository.js"
import { ProjectController } from "../controllers/project.controller.js"
import type { ProjectRepository } from "../repositories/project.repository.js"
import { CreateProjectService } from "../services/create-project.service.js"
import { DeleteProjectService } from "../services/delete-project.service.js"
import { GetProjectByIdService } from "../services/get-project-by-id.service.js"
import { ListProjectsService } from "../services/list-projects.service.js"
import { UpdateProjectService } from "../services/update-project.service.js"

export function makeProjectController(
	projectRepository: ProjectRepository,
	stackRepository: StackRepository,
) {
	return new ProjectController(
		new CreateProjectService(projectRepository, stackRepository),
		new DeleteProjectService(projectRepository),
		new GetProjectByIdService(projectRepository),
		new ListProjectsService(projectRepository),
		new UpdateProjectService(projectRepository, stackRepository),
	)
}
