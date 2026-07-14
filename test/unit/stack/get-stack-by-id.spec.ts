import { describe, expect, it } from "vitest"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { makeGetStackByIdService } from "../../../src/modules/stacks/factories/makeGetStackByIdService.js"
import { makeInMemoryStackRepository } from "./factories/makeInMemoryStackRepository.js"
import { makeStack } from "./factories/makeStack.js"

describe("Get Stack By Id Service", () => {
	it("should return a stack by id", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const createStackService = makeCreateStackService(stackRepository)
		const getStackByIdService = makeGetStackByIdService(stackRepository)

		const createdStack = await createStackService.execute(makeStack())

		const stack = await getStackByIdService.execute(createdStack.id)

		expect(stack).toEqual(createdStack)
	})

	it("should not return a non-existent stack", async () => {
		const stackRepository = makeInMemoryStackRepository()

		const getStackByIdService = makeGetStackByIdService(stackRepository)

		await expect(getStackByIdService.execute(999)).rejects.toMatchObject({
			code: "STACK_NOT_FOUND",
		})
	})
})
