import { compare } from "bcryptjs"

export async function comparePassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return await compare(password, hashedPassword)
}
