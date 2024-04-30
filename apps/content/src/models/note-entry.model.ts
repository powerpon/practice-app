import { Field, ObjectType } from '@nestjs/graphql';
import { ContentstackEntry } from 'src/types';

@ObjectType()
export default class NoteEntryModel implements ContentstackEntry {
  @Field()
  readonly title: string;
  @Field()
  readonly content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  @Field()
  readonly uid: string;

  @Field()
  created_at?: string;
  
  @Field()
  updated_at?: string;
}
