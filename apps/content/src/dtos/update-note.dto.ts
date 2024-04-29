import { PartialType } from '@nestjs/mapped-types';
import CreateNoteDTO from './create-note.dto';

export default class UpdateNoteDTO extends PartialType(CreateNoteDTO) {}
