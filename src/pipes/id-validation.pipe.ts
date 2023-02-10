import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }
    if (!uuidValidate(value)) {
      throw new HttpException('error: id is not valid', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
