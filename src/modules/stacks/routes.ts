import type { FastifyInstance } from "fastify"
import { prisma } from "../../shared/prisma/prisma-client.js"
import { makeStackController } from "./factories/makeStackController.js"
import { PrismaStackRepository } from "./repositories/prisma-stack.repository.js"
import { createStackSchema } from "./schemas/create-stack.schema.js"
import { deleteStackSchema } from "./schemas/delete-stack.schema.js"
import { getStackByIdSchema } from "./schemas/get-stack-by-id.schema.js"
import { getStacksSchema } from "./schemas/get-stacks.schema.js"
import { updateStackSchema } from "./schemas/update-stack.schema.js"

export function stackRoutes(app: FastifyInstance) {
	const stackRepository = new PrismaStackRepository(prisma)
	const stackController = makeStackController(stackRepository)

	app.post(
		"/stacks",
		{ schema: createStackSchema },
		stackController.create.bind(stackController),
	)

	app.delete(
		"/stacks/:id",
		{ schema: deleteStackSchema },
		stackController.delete.bind(stackController),
	)

	app.get(
		"/stacks/:id",
		{ schema: getStackByIdSchema },
		stackController.getById.bind(stackController),
	)

	app.get(
		"/stacks",
		{ schema: getStacksSchema },
		stackController.getAll.bind(stackController),
	)

	app.put(
		"/stacks/:id",
		{ schema: updateStackSchema },
		stackController.update.bind(stackController),
	)
}
