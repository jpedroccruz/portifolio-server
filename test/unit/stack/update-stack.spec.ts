import { describe, expect, it } from "vitest"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeUpdateStackService } from "../../../src/modules/stacks/factories/makeUpdateStackService.js"
import { makeInMemoryStackRepository } from "./factories/makeInMemoryStackRepository.js"
import { makeStack } from "./factories/makeStack.js"

describe("Update Stack Service", () => {
	it("should update a stack", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const createStackService = makeCreateStackService(stackRepository)
		const updateStackService = makeUpdateStackService(stackRepository)

		const stack = await createStackService.execute(makeStack())

		const updatedStack = await updateStackService.execute({
			id: stack.id,
			name: "TypeScript",
			iconUrl: "https://example.com/typescript.svg",
		})

		expect(updatedStack).toEqual({
			id: stack.id,
			name: "TypeScript",
			iconUrl: "https://example.com/typescript.svg",
		})
	})

	it("should not update a non-existent stack", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const updateStackService = makeUpdateStackService(stackRepository)

		await expect(
			updateStackService.execute({
				id: 999,
				name: "TypeScript",
				iconUrl: "https://example.com/typescript.svg",
			}),
		).rejects.toMatchObject({
			code: "STACK_NOT_FOUND",
			message: "This Stack Does Not Exist.",
		})
	})

	it("should not update a stack with an existing name", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const createStackService = makeCreateStackService(stackRepository)
		const updateStackService = makeUpdateStackService(stackRepository)

		const stack1 = await createStackService.execute(makeStack())
		const stack2 = await createStackService.execute(makeStack())

		await expect(
			updateStackService.execute({
				id: stack2.id,
				name: stack1.name,
				iconUrl: stack2.iconUrl,
			}),
		).rejects.toMatchObject({
			code: "STACK_ALREADY_EXISTS",
		})
	})
})
