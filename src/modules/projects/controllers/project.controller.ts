/** biome-ignore-all lint/style/useImportType: runtime reference */
import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { makeCreateProjectService } from "../factories/makeCreateProjectService.js"
import { makeDeleteProjectService } from "../factories/makeDeleteProjectService.js"
import { makeGetProjectByIdService } from "../factories/makeGetProjectByIdService.js"
import { makeGetProjectsService } from "../factories/makeGetProjectsService.js"
import { makePrismaProjectRepository } from "../factories/makePrismaProjectRepository.js"
import { makeUpdateProjectService } from "../factories/makeUpdateProjectService.js"
import { createProjectSchema } from "../schemas/create-project.schema.js"
import { deleteProjectSchema } from "../schemas/delete-project.schema.js"
import { getProjectByIdSchema } from "../schemas/get-project-by-id.schema.js"
import { getProjectsSchema } from "../schemas/get-projects.schema.js"
import { updateProjectSchema } from "../schemas/update-project.schema.js"

export class ProjectController {
	async create(
		request: FastifyRequest<{ Body: z.infer<typeof createProjectSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof createProjectSchema.response)["201"]>
		}>,
	) {
		const service = makeCreateProjectService(makePrismaProjectRepository())
		const project = await service.execute(request.body)
		return reply.code(201).send({ data: project })
	}

	async delete(
		request: FastifyRequest<{
			Params: z.infer<typeof deleteProjectSchema.params>
		}>,
		reply: FastifyReply,
	) {
		const service = makeDeleteProjectService(makePrismaProjectRepository())
		await service.execute(request.params.id)
		return reply.code(204).send()
	}

	async getById(
		request: FastifyRequest<{
			Params: z.infer<typeof getProjectByIdSchema.params>
		}>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getProjectByIdSchema.response)["200"]>
		}>,
	) {
		const service = makeGetProjectByIdService(makePrismaProjectRepository())
		const project = await service.execute(request.params.id)
		return reply.code(200).send({ data: project })
	}

	async getAll(
		_: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getProjectsSchema.response)["200"]>
		}>,
	) {
		const service = makeGetProjectsService(makePrismaProjectRepository())
		const projects = await service.execute()
		return reply.code(200).send({ data: projects })
	}

	async update(
		request: FastifyRequest<{
			Params: z.infer<typeof updateProjectSchema.params>
			Body: z.infer<typeof updateProjectSchema.body>
		}>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof updateProjectSchema.response)["200"]>
		}>,
	) {
		const service = makeUpdateProjectService(makePrismaProjectRepository())
		const project = await service.execute({
			id: request.params.id,
			...request.body,
		})
		return reply.code(200).send({ data: project })
	}
}
