export class AppError extends Error {
  public status: number;
  public code: string;
  public details: string | null;

  constructor(
    message: string,
    { status = 500, code = 'INTERNAL_ERROR', details = null } = {},
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, { status: 400, code: 'BAD_REQUEST' });
  }
}

export class UnAuthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, { status: 401, code: 'UNAUTHORIZED' });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, { status: 403, code: 'FORBIDDEN' });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, { status: 404, code: 'NOT_FOUND' });
  }
}
