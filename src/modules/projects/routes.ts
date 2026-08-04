import type { AppInstance } from "../../app.js"
import { authHandler } from "../../shared/lib/auth-handler.js"
import { prisma } from "../../shared/prisma/prisma-client.js"
import { PrismaStackRepository } from "../stacks/repositories/prisma-stack.repository.js"
import { makeProjectController } from "./factories/makeProjectController.js"
import { PrismaProjectRepository } from "./repositories/prisma-project.repository.js"
import { createProjectSchema } from "./schemas/create-project.schema.js"
import { deleteProjectSchema } from "./schemas/delete-project.schema.js"
import { getProjectByIdSchema } from "./schemas/get-project-by-id.schema.js"
import { getProjectsSchema } from "./schemas/get-projects.schema.js"
import { updateProjectSchema } from "./schemas/update-project.schema.js"

export function projectRoutes(app: AppInstance) {
	const stackRepository = new PrismaStackRepository(prisma)
	const projectRepository = new PrismaProjectRepository(prisma)
	const projectController = makeProjectController(
		projectRepository,
		stackRepository,
	)

	app.post(
		"/projects",
		{ schema: createProjectSchema, onRequest: [authHandler] },
		projectController.create.bind(projectController),
	)

	app.delete(
		"/projects/:id",
		{ schema: deleteProjectSchema, onRequest: [authHandler] },
		projectController.delete.bind(projectController),
	)

	app.get(
		"/projects/:id",
		{ schema: getProjectByIdSchema, onRequest: [authHandler] },
		projectController.getById.bind(projectController),
	)

	app.get(
		"/projects",
		{ schema: getProjectsSchema },
		projectController.getAll.bind(projectController),
	)

	app.put(
		"/projects/:id",
		{ schema: updateProjectSchema, onRequest: [authHandler] },
		projectController.update.bind(projectController),
	)
}
