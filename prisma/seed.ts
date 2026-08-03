import { hashPassword } from "../src/shared/lib/hash-password.js"
import { prisma } from "../src/shared/prisma/prisma-client.js"

async function seed() {
	await prisma.refreshToken.deleteMany()
	await prisma.project.deleteMany()
	await prisma.stack.deleteMany()
	await prisma.user.deleteMany()

	const user = await prisma.user.create({
		data: {
			username: "admin",
			passwordHash: await hashPassword("admin123"),
		},
	})

	const typescript = await prisma.stack.create({
		data: {
			name: "TypeScript",
			iconUrl:
				"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
		},
	})

	const fastify = await prisma.stack.create({
		data: {
			name: "Fastify",
			iconUrl:
				"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg",
		},
	})

	await prisma.project.create({
		data: {
			name: "Portfolio API",
			description:
				"REST API desenvolvida em Fastify para gerenciar os projetos do meu portfólio.",
			gitHubUrl: "https://github.com/jpedroccruz/portfolio-server",
			thumbnailUrl: "https://placehold.co/1280x720/png?text=Portfolio+API",
			publishedAt: new Date(),

			stacks: {
				connect: [{ id: typescript.id }, { id: fastify.id }],
			},
		},
	})

	console.log("🌱 Database seeded successfully!")
	console.log(`👤 User created: ${user.username}`)
}

seed()
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect()
	})
