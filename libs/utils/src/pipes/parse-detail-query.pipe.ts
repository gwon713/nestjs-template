import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseDetailQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      return value;
    }

    if (metadata.type === 'query' && metadata.data === 'options' && !!value) {
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
    }

    return value;
  }
}
