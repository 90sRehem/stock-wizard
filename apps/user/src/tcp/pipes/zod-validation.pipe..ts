import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<ZodRawShape>) { }

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed no user',
          errors: error.flatten().fieldErrors,
          statusCode: 400,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
