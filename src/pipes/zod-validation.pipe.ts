import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, infer as ZodInfer, ZodError } from 'zod';

export class ZodValidationPipe<T extends ZodSchema> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    try {
      const parsedValue = this.schema.parse(value) as ZodInfer<T>;
      return parsedValue;
    } catch (err) {
      if (err instanceof ZodError) {
        // Ensure TypeScript recognizes err as ZodError
        const errorMessage: string = err.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');

        throw new BadRequestException(errorMessage);
      }

      throw new BadRequestException('Validation failed', { cause: err });
    }
  }
}
