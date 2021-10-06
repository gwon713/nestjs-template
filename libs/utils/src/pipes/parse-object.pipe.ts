import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseObjectPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!!value && typeof value === 'string') {
      value = JSON.parse(value);
    }
    return value;
  }
}
