import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class KeysValidationPipe implements PipeTransform {
  keys: string[];
  constructor(keys: string[]) {
    this.keys = keys;
  }
  transform(value: any, metadata: ArgumentMetadata) {
    for (let key of this.keys) {
      if (!(key in value)) {
        throw new BadRequestException(`${key} is required`);
      }
    }
    return value;
  }
}
