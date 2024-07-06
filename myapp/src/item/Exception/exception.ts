import { HttpException,HttpStatus } from "@nestjs/common";

export class NameValidationException extends HttpException{
    constructor(message : string="name should contain only alphabets"){
        super(message,HttpStatus.BAD_REQUEST);
    }
}

export class LengthValidationException extends HttpException {
    constructor(message: string = "Name must be between 6 and 12 characters") {
      super(message,HttpStatus.BAD_REQUEST);
    }
  }

  export class NotFoundException extends HttpException {
    constructor(message: string = 'Not Found') {
      super(message, HttpStatus.NOT_FOUND);
    }
  }
  
  export class BadRequestException extends HttpException {
    constructor(message: string = 'Bad Request') {
      super(message, HttpStatus.BAD_REQUEST);
    }
  }

export class UnauthorizedException extends HttpException{
    constructor(message:string = 'unauthorized'){
        super(message, HttpStatus.UNAUTHORIZED);
    }
}