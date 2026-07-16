/** biome-ignore-all lint/style/useImportType: runtime reference */
import type { FastifyReply, FastifyRequest } from "fastify"
import type z from "zod"
import { createProjectSchema } from "../schemas/create-project.schema.js"
import { deleteProjectSchema } from "../schemas/delete-project.schema.js"
import { getProjectByIdSchema } from "../schemas/get-project-by-id.schema.js"
import { getProjectsSchema } from "../schemas/get-projects.schema.js"
import { updateProjectSchema } from "../schemas/update-project.schema.js"
import type { CreateProjectService } from "../services/create-project.service.js"
import type { DeleteProjectService } from "../services/delete-project.service.js"
import type { GetProjectByIdService } from "../services/get-project-by-id.service.js"
import type { ListProjectsService } from "../services/list-projects.service.js"
import type { UpdateProjectService } from "../services/update-project.service.js"

export class ProjectController {
	constructor(
		private readonly createProjectService: CreateProjectService,
		private readonly deleteProjectService: DeleteProjectService,
		private readonly getProjectByIdService: GetProjectByIdService,
		private readonly listProjectsService: ListProjectsService,
		private readonly updateProjectService: UpdateProjectService,
	) {}

	async create(
		request: FastifyRequest<{ Body: z.infer<typeof createProjectSchema.body> }>,
		reply: FastifyReply<{
			Reply: z.infer<(typeof createProjectSchema.response)["201"]>
		}>,
	) {
		const project = await this.createProjectService.execute(request.body)
		return reply.code(201).send({ data: project })
	}

	async delete(
		request: FastifyRequest<{
			Params: z.infer<typeof deleteProjectSchema.params>
		}>,
		reply: FastifyReply,
	) {
		await this.deleteProjectService.execute(request.params.id)
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
		const project = await this.getProjectByIdService.execute(request.params.id)
		return reply.code(200).send({ data: project })
	}

	async getAll(
		_: FastifyRequest,
		reply: FastifyReply<{
			Reply: z.infer<(typeof getProjectsSchema.response)["200"]>
		}>,
	) {
		const projects = await this.listProjectsService.execute()
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
		const project = await this.updateProjectService.execute({
			id: request.params.id,
			...request.body,
		})
		return reply.code(200).send({ data: project })
	}
}
