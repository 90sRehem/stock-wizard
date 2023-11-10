// Error
export class IsFailure<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isSuccess(): this is IsSuccess<L, R> {
    return false;
  }

  isFailure(): this is IsFailure<L, R> {
    return true;
  }
}

// Success
export class IsSuccess<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isSuccess(): this is IsSuccess<L, R> {
    return true;
  }

  isFailure(): this is IsFailure<L, R> {
    return false;
  }
}

export type Either<L, R> = IsFailure<L, R> | IsSuccess<L, R>;

export const failure = <L, R>(value: L): Either<L, R> => {
  return new IsFailure(value);
};

export const success = <L, R>(value: R): Either<L, R> => {
  return new IsSuccess(value);
};