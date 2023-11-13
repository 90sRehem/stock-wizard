import { UseCaseError } from "@/core";

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`The user ${identifier} already exists`);
  }
}