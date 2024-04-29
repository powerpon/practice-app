import { HttpStatus } from '@nestjs/common';
import ContentstackError from './contentstack.error';

export default class NoteNotFoundError extends ContentstackError {
  constructor(errors: object) {
    super(HttpStatus.NOT_FOUND, 'Note Not Found', errors);
  }
}
