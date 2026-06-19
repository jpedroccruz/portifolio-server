export class AppError extends Error {
	constructor(
		message: string,
		private readonly statusCode: number,
		private readonly code: string,
	) {
		super(message)
	}
}
