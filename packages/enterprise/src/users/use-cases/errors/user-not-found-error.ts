import { UseCaseError } from "@/core";

export class UserNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`User not found`);
  }
}