import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeCreateProjectService } from "../factories/makeCreateProjectService.js"
import type { createProjectSchema } from "../schemas/create-project.schema.js"

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
}
