import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import type { createStackSchema } from "../schemas/create-stack.schema.js"
import type { deleteStackSchema } from "../schemas/delete-stack.schema.js"
import type { getStackByIdSchema } from "../schemas/get-stack-by-id.schema.js"
import type { getStacksSchema } from "../schemas/get-stacks.schema.js"
import type { updateStackSchema } from "../schemas/update-stack.schema.js"
import type { CreateStackService } from "../services/create-stack.service.js"
import type { DeleteStackService } from "../services/delete-stack.service.js"
import type { GetStackByIdService } from "../services/get-stack-by-id.service.js"
import type { ListStacksService } from "../services/list-stacks.service.js"
import type { UpdateStackService } from "../services/update-stack.service.js"

export class StackController {
	constructor(
		private readonly createStackService: CreateStackService,
		private readonly deleteStackService: DeleteStackService,
		private readonly getStackByIdService: GetStackByIdService,
		private readonly listStacksService: ListStacksService,
		private readonly updateStackService: UpdateStackService,
	) {}

	async create(
		request: FastifyRequest<{ Body: z.infer<typeof createStackSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof createStackSchema.response)["201"]>
		}>,
	) {
		const stack = await this.createStackService.execute(request.body)
		return reply.code(201).send({ data: stack })
	}

	delete(
		request: FastifyRequest<{
			Params: z.infer<typeof deleteStackSchema.params>
		}>,
		reply: FastifyReply,
	) {
		this.deleteStackService.execute(request.params.id)
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
		const stack = await this.getStackByIdService.execute(request.params.id)
		return reply.code(200).send({ data: stack })
	}

	async getAll(
		_: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getStacksSchema.response)["200"]>
		}>,
	) {
		const stacks = await this.listStacksService.execute()
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
		const stack = await this.updateStackService.execute({
			id: request.params.id,
			...request.body,
		})
		return reply.code(200).send({ data: stack })
	}
}
