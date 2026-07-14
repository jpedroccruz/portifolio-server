import { describe, expect, it } from "vitest"
import { makeCreateProjectService } from "../../../src/modules/projects/factories/makeCreateProjectService.js"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { ConflictError } from "../../../src/shared/error/Errors.js"
import { makeInMemoryStackRepository } from "../stack/factories/makeInMemoryStackRepository.js"
import { makeStack } from "../stack/factories/makeStack.js"
import { makeInMemoryProjectRepository } from "./factories/makeInMemoryProjectRepository.js"
import { makeProject } from "./factories/makeProject.js"

describe("Create Project Service", () => {
	it("should create a project", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectService = makeCreateProjectService(
			makeInMemoryProjectRepository(stackRepository),
			stackRepository,
		)
		const stackService = makeCreateStackService(stackRepository)

		const stackData = makeStack()
		const stack = await stackService.execute(stackData)

		const projectData = makeProject([stack.id])
		const project = await projectService.execute(projectData)

		expect(project).toEqual({
			id: project.id,
			name: projectData.name,
			description: projectData.description,
			gitHubUrl: null,
			publishedAt: projectData.publishedAt,
			thumbnailUrl: null,
			stacks: [stack],
		})
	})

	it("should not create a project with an existing name", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectService = makeCreateProjectService(
			makeInMemoryProjectRepository(stackRepository),
			stackRepository,
		)
		const stackService = makeCreateStackService(stackRepository)

		const stackData = makeStack()
		const stack = await stackService.execute(stackData)

		const projectData = makeProject([stack.id])
		await projectService.execute(projectData)

		await expect(
			projectService.execute({
				name: projectData.name,
				description: "Another description",
				gitHubUrl: null,
				publishedAt: new Date(),
				thumbnailUrl: null,
				stackIds: [stack.id],
			}),
		).rejects.toMatchObject({ code: "PROJECT_ALREADY_EXISTS" })
	})

	it("should not create a project with non-existent stacks", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const projectService = makeCreateProjectService(
			makeInMemoryProjectRepository(stackRepository),
			stackRepository,
		)

		await expect(
			projectService.execute(makeProject([999])),
		).rejects.toMatchObject({
			code: "STACK_NOT_FOUND",
		})
	})
})
