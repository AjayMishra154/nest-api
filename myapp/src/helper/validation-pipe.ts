import { Injectable, PipeTransform } from '@nestjs/common';
import BadRequestError from './bad-request-exception';
 
@Injectable()
export class ValidateIdPipe implements PipeTransform<string> {
  transform(value: string): number {
    const num = parseInt(value);
    if (!Number.isInteger(num)) {
      throw new BadRequestError(`'${value}' is not a valid ID. ID must be an integer.`);
    }
    return num;
  }
}