import z from "zod"

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	EMAIL: z.email().min(1),
	MAIL_PROVIDER_KEY: z.string().min(1),
	JWT_SECRET: z.string().min(1),
})

export const env = envSchema.parse(process.env)
