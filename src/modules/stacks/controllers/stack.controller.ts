import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeCreateStackService } from "../factories/makeCreateStackService.js"
import { makeDeleteStackService } from "../factories/makeDeleteStackService.js"
import { makeGetStackByIdService } from "../factories/makeGetStackByIdService.js"
import { makeListStacksService } from "../factories/makeListStackService.js"
import { makePrismaStackRepository } from "../factories/makePrismaStackRepository.js"
import { makeUpdateStackService } from "../factories/makeUpdateStackService.js"
import type { createStackSchema } from "../schemas/create-stack.schema.js"
import type { deleteStackSchema } from "../schemas/delete-stack.schema.js"
import type { getStackByIdSchema } from "../schemas/get-stack-by-id.schema.js"
import type { getStacksSchema } from "../schemas/get-stacks.schema.js"
import type { updateStackSchema } from "../schemas/update-stack.schema.js"

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

	async getAll(
		_: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getStacksSchema.response)["200"]>
		}>,
	) {
		const service = makeListStacksService(makePrismaStackRepository())
		const stacks = await service.execute()
		return reply.code(200).send({ data: stacks })
	}

	async update(
		request: FastifyRequest<{
			Body: z.infer<typeof updateStackSchema.body>
			Params: z.infer<typeof updateStackSchema.params>
		}>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof updateStackSchema.response)["200"]>
		}>,
	) {
		const service = makeUpdateStackService(makePrismaStackRepository())
		const stack = await service.execute({
			id: request.params.id,
			...request.body,
		})
		return reply.code(200).send({ data: stack })
	}
}
