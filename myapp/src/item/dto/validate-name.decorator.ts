import {createParamDecorator, HttpException, HttpStatus, ExecutionContext} from '@nestjs/common';
import { NameValidationException, LengthValidationException } from "../Exception/exception";

export const ValidateName = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const {name} =  request.body;

      if (typeof name !== 'string' || /\d/.test(name)) {
        throw new NameValidationException();
        
      }
      return name;
    },
);

export const minmax = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const {name} =  request.body;
    if (typeof name != 'string' || !(name.length <= 6) || !(name.length >=12)){
      throw new LengthValidationException();
    }
    return name;
  },

);
