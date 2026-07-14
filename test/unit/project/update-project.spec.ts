import { describe, expect, it } from "vitest"
import { makeCreateProjectService } from "../../../src/modules/projects/factories/makeCreateProjectService.js"
import { makeUpdateProjectService } from "../../../src/modules/projects/factories/makeUpdateProjectService.js"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeInMemoryStackRepository } from "../stack/factories/makeInMemoryStackRepository.js"
import { makeStack } from "../stack/factories/makeStack.js"
import { makeInMemoryProjectRepository } from "./factories/makeInMemoryProjectRepository.js"
import { makeProject } from "./factories/makeProject.js"

describe("Update Project Service", () => {
	it("should update a project", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const createStackService = makeCreateStackService(stackRepository)
		const createProjectService = makeCreateProjectService(
			projectRepository,
			stackRepository,
		)
		const updateProjectService = makeUpdateProjectService(
			projectRepository,
			stackRepository,
		)

		const stack = await createStackService.execute(makeStack())

		const project = await createProjectService.execute(makeProject([stack.id]))

		const updatedProject = await updateProjectService.execute({
			id: project.id,
			name: project.name,
			description: "Updated description",
			gitHubUrl: "https://github.com/user/updated-project",
			publishedAt: new Date(),
			thumbnailUrl: "https://image.com/updated-project.png",
			stackIds: [stack.id],
		})

		expect(updatedProject).toMatchObject({
			id: project.id,
			name: project.name,
			description: "Updated description",
			gitHubUrl: "https://github.com/user/updated-project",
			thumbnailUrl: "https://image.com/updated-project.png",
			stacks: [stack],
		})
	})

	it("should not update a non-existent project", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const updateProjectService = makeUpdateProjectService(
			projectRepository,
			stackRepository,
		)

		await expect(
			updateProjectService.execute({
				id: 999,
				name: "Updated project",
				description: "Updated description",
				gitHubUrl: null,
				publishedAt: new Date(),
				thumbnailUrl: null,
				stackIds: [],
			}),
		).rejects.toMatchObject({
			code: "PROJECT_DOES_NOT_EXIST",
			message: "This Project Does Not Exist.",
		})
	})

	it("should not update a project with an existing name", async () => {
		const stackRepository = makeInMemoryStackRepository()
		const projectRepository = makeInMemoryProjectRepository(stackRepository)

		const createStackService = makeCreateStackService(stackRepository)
		const createProjectService = makeCreateProjectService(
			projectRepository,
			stackRepository,
		)
		const updateProjectService = makeUpdateProjectService(
			projectRepository,
			stackRepository,
		)

		const stack = await createStackService.execute(makeStack())

		const project1 = await createProjectService.execute(makeProject([stack.id]))
		const project2 = await createProjectService.execute(makeProject([stack.id]))

		await expect(
			updateProjectService.execute({
				id: project2.id,
				name: project1.name,
				description: "Updated description",
				gitHubUrl: null,
				publishedAt: new Date(),
				thumbnailUrl: null,
				stackIds: [stack.id],
			}),
		).rejects.toMatchObject({
			code: "PROJECT_ALREADY_EXISTS",
		})
	})
})
