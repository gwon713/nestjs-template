import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class MallIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const keys = Object.keys(value);
    for (const key of keys) {
      if (!value[key].mallId || value[key].mallId === '') {
        throw new BadRequestException('mall id is required');
      }
    }

    return value;
  }
}
