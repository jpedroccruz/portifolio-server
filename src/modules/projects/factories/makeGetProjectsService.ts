import { ListProjectsService } from "../services/list-projects.service.js"
import { makeProjectRepository } from "./makeProjectRepository.js"

export function makeGetProjectsService() {
	return new ListProjectsService(makeProjectRepository())
}
