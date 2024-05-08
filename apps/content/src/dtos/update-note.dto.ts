import CreateNoteDTO from './create-note.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export default class UpdateNoteDTO extends PartialType(CreateNoteDTO) {}
