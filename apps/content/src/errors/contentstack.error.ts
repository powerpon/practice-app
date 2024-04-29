import { HttpException } from '@nestjs/common';

export default class ContentstackError extends HttpException {
  constructor(status: number, errorMessage: string, errors: object) {
    super({ errorMessage, errors }, status);
  }
}
