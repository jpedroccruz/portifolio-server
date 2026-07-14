import { describe, expect, it } from "vitest"
import { makeCreateStackService } from "../../../src/modules/stacks/factories/makeCreateStackService.js"
import { ConflictError } from "../../../src/shared/error/Errors.js"
import { makeInMemoryStackRepository } from "../../factories/makeInMemoryStackRepository.js"
import { makeStack } from "../../factories/makeStack.js"

describe("Create Stack Service", () => {
	it("should create a stack", async () => {
		const repository = makeInMemoryStackRepository()
		const service = makeCreateStackService(repository)

		const data = makeStack()

		const stack = await service.execute(data)

		expect(stack).toMatchObject({
			name: data.name,
			iconUrl: data.iconUrl,
		})

		expect(stack.id).toBeDefined()
	})

	it("should not create a stack with an existing name", async () => {
		const repository = makeInMemoryStackRepository()
		const service = makeCreateStackService(repository)

		const data = makeStack()

		await service.execute(data)

		await expect(service.execute(data)).rejects.toThrow(ConflictError)
		await expect(service.execute(data)).rejects.toMatchObject({
			code: "STACK_ALREADY_EXISTS",
			message: "This Stack Already Exists.",
		})
	})
})
