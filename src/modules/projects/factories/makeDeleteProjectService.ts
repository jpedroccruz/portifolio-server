import { DeleteProjectService } from "../services/delete-project.service.js"
import { makeProjectRepository } from "./makeProjectRepository.js"

export function makeDeleteProjectService() {
	return new DeleteProjectService(makeProjectRepository())
}
