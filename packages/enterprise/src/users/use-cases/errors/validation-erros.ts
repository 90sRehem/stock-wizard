import { UseCaseError } from "@/core";

export class ValidationError extends Error implements UseCaseError {
  constructor(identifier: string | string[]) {
    super(`Validation error: ${identifier}`);
  }
}