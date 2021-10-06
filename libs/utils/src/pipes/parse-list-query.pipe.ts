import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseListQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      return value;
    }

    if (metadata.type === 'query' && metadata.data === 'options' && !!value) {
      if (typeof value === 'string') {
        value = JSON.parse(value);

        if (!!value.count && typeof value.count === 'string') {
          value.count = parseInt(value.count);
        }

        if (value.isAll && typeof value.isAll === 'string') {
          value.isAll = value.isAll === 'true';
        }
      }
    }
    return value;
  }
}
