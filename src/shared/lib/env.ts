import z from "zod"

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().min(1),
	POSTGRES_USER: z.string().min(1),
	POSTGRES_PASSWORD: z.string().min(1),
	POSTGRES_DB: z.string().min(1),
	POSTGRES_PORT: z.coerce.number().default(5432),
	POSTGRES_HOST: z.string().min(1).default("localhost"),
	EMAIL: z.email().min(1),
	MAIL_PROVIDER_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
