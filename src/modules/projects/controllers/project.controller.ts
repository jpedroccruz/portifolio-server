import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeCreateProjectService } from "../factories/makeCreateProjectService.js"
import { makeDeleteProjectService } from "../factories/makeDeleteProjectService.js"
import { makeGetProjectByIdService } from "../factories/makeGetProjectByIdService.js"
import type { createProjectSchema } from "../schemas/create-project.schema.js"
import type { deleteProjectSchema } from "../schemas/delete-project.schema.js"
import type { getProjectByIdSchema } from "../schemas/get-project-by-id.schema.js"

export class ProjectController {
	async create(
		request: FastifyRequest<{ Body: z.infer<typeof createProjectSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof createProjectSchema.response)["201"]>
		}>,
	) {
		const service = makeCreateProjectService()
		const project = await service.execute(request.body)
		return reply.code(201).send({ data: project })
	}

	async delete(
		request: FastifyRequest<{
			Params: z.infer<typeof deleteProjectSchema.params>
		}>,
		reply: FastifyReply,
	) {
		const service = makeDeleteProjectService()
		await service.execute(request.params.id)
		return reply.code(204).send()
	}

	async getById(
		request: FastifyRequest<{
			Params: z.infer<typeof getProjectByIdSchema.params>
		}>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getProjectByIdSchema.response)["201"]>
		}>,
	) {
		const service = makeGetProjectByIdService()
		const project = await service.execute(request.params.id)
		return reply.code(201).send({ data: project })
	}
}
