import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeCreateStackService } from "../factories/makeCreateStackService.js"
import { makePrismaStackRepository } from "../factories/makePrismaStackRepository.js"
import type { createStackSchema } from "../schemas/create-stack.schema.js"

export class StackController {
	async create(
		request: FastifyRequest<{ Body: z.infer<typeof createStackSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof createStackSchema.response)["201"]>
		}>,
	) {
		const service = makeCreateStackService(makePrismaStackRepository())
		const stack = await service.execute(request.body)
		return reply.code(201).send({ data: stack })
	}
}
