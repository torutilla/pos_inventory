import type { ValidationError } from "../types/api.js";

class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors?: ValidationError[];

  constructor(
    message: string,
    statusCode: number,
    errors?: ValidationError[],
  ) {
    super(message);

    this.statusCode = statusCode;

    if (errors) {
      this.errors = errors;
    }

    Object.setPrototypeOf(
      this,
      new.target.prototype,
    );
  }
}

export default AppError;