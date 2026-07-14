import { describe, expect, it } from "vitest"
import { makeCreateProjectService } from "../../../src/modules/projects/factories/makeCreateProjectService.js"
import { makeGetProjectByIdService } from "../../../src/modules/projects/factories/makeGetProjectByIdService.js"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeInMemoryStackRepository } from "../stack/factories/makeInMemoryStackRepository.js"
import { makeStack } from "../stack/factories/makeStack.js"
import { makeInMemoryProjectRepository } from "./factories/makeInMemoryProjectRepository.js"
import { makeProject } from "./factories/makeProject.js"

describe("Get Project By Id Service", () => {
	it("should return a project by id", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const createStackService = makeCreateStackService(stackRepository)
		const createProjectService = makeCreateProjectService(
			projectRepository,
			stackRepository,
		)
		const getProjectByIdService = makeGetProjectByIdService(projectRepository)

		const stack = await createStackService.execute(makeStack())

		const createdProject = await createProjectService.execute(
			makeProject([stack.id]),
		)

		const project = await getProjectByIdService.execute(createdProject.id)

		expect(project).toEqual(createdProject)
	})

	it("should not return a non-existent project", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const getProjectByIdService = makeGetProjectByIdService(projectRepository)

		await expect(getProjectByIdService.execute(999)).rejects.toMatchObject({
			code: "PROJECT_DOES_NOT_EXIST",
		})
	})
})
