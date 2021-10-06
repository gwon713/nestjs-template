import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const keys = Object.keys(value);
    for (const key of keys) {
      if (!value[key].userId || value[key].userId === '') {
        throw new BadRequestException('user id is required');
      }
    }

    return value;
  }
}
