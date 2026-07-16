import type { StackRepository } from "../../stacks/repositories/stack.repository.js"
import { StackController } from "../controllers/stack.controller.js"
import { makeCreateStackService } from "./makeCreateStackService.js"
import { makeDeleteStackService } from "./makeDeleteStackService.js"
import { makeGetStackByIdService } from "./makeGetStackByIdService.js"
import { makeListStacksService } from "./makeListStackService.js"
import { makeUpdateStackService } from "./makeUpdateStackService.js"

export function makeStackController(stackRepository: StackRepository) {
	return new StackController(
		makeCreateStackService(stackRepository),
		makeDeleteStackService(stackRepository),
		makeGetStackByIdService(stackRepository),
		makeListStacksService(stackRepository),
		makeUpdateStackService(stackRepository),
	)
}
