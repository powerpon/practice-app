import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateNoteDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
