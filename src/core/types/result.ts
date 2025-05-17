export class AppError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    public readonly statusCode?: number,
    cause?: unknown
  ) {
    super(message, cause);
  }
}

export class CacheError extends AppError {}

export type Result<T, E extends AppError = AppError> =
  | { success: true; data: T }
  | { success: false; error: E };

export const ok = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

export const err = <E extends AppError>(error: E): Result<never, E> => ({
  success: false,
  error,
});
