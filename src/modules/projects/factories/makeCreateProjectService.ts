import { CreateProjectService } from "../services/create-project.service.js"
import { makeProjectRepository } from "./makeProjectRepository.js"

export function makeCreateProjectService() {
	return new CreateProjectService(makeProjectRepository())
}
