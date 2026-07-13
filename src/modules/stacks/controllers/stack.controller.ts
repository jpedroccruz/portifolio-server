import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeCreateStackService } from "../factories/makeCreateStackService.js"
import { makeDeleteStackService } from "../factories/makeDeleteStackService.js"
import { makeGetStackByIdService } from "../factories/makeGetStackByIdService.js"
import { makePrismaStackRepository } from "../factories/makePrismaStackRepository.js"
import type { createStackSchema } from "../schemas/create-stack.schema.js"
import type { deleteStackSchema } from "../schemas/delete-stack.schema.js"
import type { getStackByIdSchema } from "../schemas/get-stack-by-id.schema.js"

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

	delete(
		request: FastifyRequest<{
			Params: z.infer<typeof deleteStackSchema.params>
		}>,
		reply: FastifyReply,
	) {
		const service = makeDeleteStackService(makePrismaStackRepository())
		service.execute(request.params.id)
		return reply.code(204).send()
	}

	async getById(
		request: FastifyRequest<{
			Params: z.infer<typeof getStackByIdSchema.params>
		}>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getStackByIdSchema.response)["200"]>
		}>,
	) {
		const service = makeGetStackByIdService(makePrismaStackRepository())
		const stack = await service.execute(request.params.id)
		return reply.code(200).send({ data: stack })
	}
}
