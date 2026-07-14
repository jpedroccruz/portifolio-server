import { describe, expect, it } from "vitest"
import { makeCreateProjectService } from "../../../src/modules/projects/factories/makeCreateProjectService.js"
import { makeListProjectsService } from "../../../src/modules/projects/factories/makeListProjectsService.js"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeInMemoryStackRepository } from "../stack/factories/makeInMemoryStackRepository.js"
import { makeStack } from "../stack/factories/makeStack.js"
import { makeInMemoryProjectRepository } from "./factories/makeInMemoryProjectRepository.js"
import { makeProject } from "./factories/makeProject.js"

describe("List Projects Service", () => {
	it("should return all projects", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const createStackService = makeCreateStackService(stackRepository)
		const createProjectService = makeCreateProjectService(
			projectRepository,
			stackRepository,
		)
		const listProjectsService = makeListProjectsService(projectRepository)

		const stack = await createStackService.execute(makeStack())

		const project1 = await createProjectService.execute(makeProject([stack.id]))
		const project2 = await createProjectService.execute(makeProject([stack.id]))

		const projects = await listProjectsService.execute()

		expect(projects).toHaveLength(2)
		expect(projects).toEqual([project1, project2])
	})

	it("should return an empty array when there are no projects", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const listProjectsService = makeListProjectsService(projectRepository)

		const projects = await listProjectsService.execute()

		expect(projects).toEqual([])
	})
})
