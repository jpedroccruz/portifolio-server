import { AppError } from "./AppError.js"

// TODO: add error code enum

export class ConflictError extends AppError {
	constructor(message: string, code: string) {
		super(message, 409, code)
	}
}

export class NotFoundError extends AppError {
	constructor(message: string, code: string) {
		super(message, 404, code)
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string, code: string) {
		super(message, 401, code)
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string, code: string) {
		super(message, 403, code)
	}
}

export class BadRequestError extends AppError {
	constructor(message: string, code: string) {
		super(message, 400, code)
	}
}

export class ServiceUnavailableError extends AppError {
	constructor(message: string, code: string) {
		super(message, 503, code)
	}
}

export class InternalServerError extends AppError {
	constructor(
		message = "Internal Server Error",
		code = "INTERNAL_SERVER_ERROR",
	) {
		super(message, 503, code)
	}
}
