import { describe, expect, it } from "vitest"
import { makeCreateProjectService } from "../../../src/modules/projects/factories/makeCreateProjectService.js"
import { makeDeleteProjectService } from "../../../src/modules/projects/factories/makeDeleteProjectService.js"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeInMemoryStackRepository } from "../stack/factories/makeInMemoryStackRepository.js"
import { makeStack } from "../stack/factories/makeStack.js"
import { makeInMemoryProjectRepository } from "./factories/makeInMemoryProjectRepository.js"
import { makeProject } from "./factories/makeProject.js"

describe("Delete Project Service", () => {
	it("should delete a project", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const createStackService = makeCreateStackService(stackRepository)
		const createProjectService = makeCreateProjectService(
			projectRepository,
			stackRepository,
		)
		const deleteProjectService = makeDeleteProjectService(projectRepository)

		const stack = await createStackService.execute(makeStack())

		const project = await createProjectService.execute(makeProject([stack.id]))

		await deleteProjectService.execute(project.id)

		expect(await projectRepository.findById(project.id)).toBeNull()
		expect(await projectRepository.findMany()).toHaveLength(0)
	})

	it("should not delete a non-existent project", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const deleteProjectService = makeDeleteProjectService(projectRepository)

		await expect(deleteProjectService.execute(999)).rejects.toMatchObject({
			code: "PROJECT_DOES_NOT_EXIST",
		})
	})
})
