import { GetProjectByIdService } from "../services/get-project-by-id.service.js"
import { makeProjectRepository } from "./makeProjectRepository.js"

export function makeGetProjectByIdService() {
	return new GetProjectByIdService(makeProjectRepository())
}
