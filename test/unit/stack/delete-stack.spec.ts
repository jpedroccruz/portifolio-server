import { describe, expect, it } from "vitest"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeDeleteStackService } from "../../../src/modules/stacks/factories/makeDeleteStackService.js"
import { makeInMemoryStackRepository } from "./factories/makeInMemoryStackRepository.js"
import { makeStack } from "./factories/makeStack.js"

describe("Delete Stack Service", () => {
	it("should delete a stack", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const createStackService = makeCreateStackService(stackRepository)
		const deleteStackService = makeDeleteStackService(stackRepository)

		const stack = await createStackService.execute(makeStack())

		await deleteStackService.execute(stack.id)

		expect(await stackRepository.findById(stack.id)).toBeNull()
		expect(await stackRepository.findMany()).toHaveLength(0)
	})

	it("should not delete a non-existent stack", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const deleteStackService = makeDeleteStackService(stackRepository)

		await expect(deleteStackService.execute(999)).rejects.toMatchObject({
			code: "STACK_NOT_FOUND",
		})
	})
})
