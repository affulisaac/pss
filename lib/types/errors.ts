export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public data?: any
  ) {
    super(message);
    this.name = 'AppError';
  }

  static BadRequest(message: string, data?: any) {
    return new AppError(message, 'BAD_REQUEST', 400, data);
  }

  static Unauthorized(message: string = 'Unauthorized access') {
    return new AppError(message, 'UNAUTHORIZED', 401);
  }

  static NotFound(message: string = 'Resource not found') {
    return new AppError(message, 'NOT_FOUND', 404);
  }

  static ServerError(message: string = 'Internal server error') {
    return new AppError(message, 'SERVER_ERROR', 500);
  }
}

export type ErrorResponse = {
  code: string;
  message: string;
  statusCode: number;
  data?: any;
};