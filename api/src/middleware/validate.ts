import type {
  NextFunction,
  Request,
  Response,
} from "express";
import type { ZodType } from "zod";

import AppError from "../utils/AppError.js";

function validate(schema: ZodType) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      next(
        new AppError(
          "Validation failed",
          400,
          errors,
        ),
      );

      return;
    }

    next();
  };
}

export default validate;