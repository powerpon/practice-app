import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export default class CreateNoteDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;
}
