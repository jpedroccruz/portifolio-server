import { describe, expect, it } from "vitest"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeListStacksService } from "../../../src/modules/stacks/factories/makeListStackService.js"
import { makeInMemoryStackRepository } from "./factories/makeInMemoryStackRepository.js"
import { makeStack } from "./factories/makeStack.js"

describe("List Stacks Service", () => {
	it("should return all stacks", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const createStackService = makeCreateStackService(stackRepository)
		const listStacksService = makeListStacksService(stackRepository)

		const stack1 = await createStackService.execute(makeStack())
		const stack2 = await createStackService.execute(makeStack())

		const stacks = await listStacksService.execute()

		expect(stacks).toHaveLength(2)
		expect(stacks).toEqual([stack1, stack2])
	})

	it("should return an empty array when there are no stacks", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const listStacksService = makeListStacksService(stackRepository)

		const stacks = await listStacksService.execute()

		expect(stacks).toEqual([])
	})
})
