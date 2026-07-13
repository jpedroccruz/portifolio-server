import { UpdateProjectService } from "../services/update-project.service.js"
import { makeProjectRepository } from "./makeProjectRepository.js"

export function makeUpdateProjectService() {
	return new UpdateProjectService(makeProjectRepository())
}
