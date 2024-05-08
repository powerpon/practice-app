import { Inject } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO, UpdateNoteDTO } from 'src/dtos';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoteEntryModel } from 'src/models';

@Resolver()
export class NotesResolver {
  constructor(
    @Inject(NotesService) private readonly notesService: NotesService,
  ) {}

  @Query(() => [NoteEntryModel], { name: 'notes' })
  async getNotes() {
    return await this.notesService.getAllNotes();
  }

  @Mutation(() => NoteEntryModel, { name: 'create_note' })
  async saveNote(@Args('createNoteDto') createNoteDto: CreateNoteDTO) {
    return await this.notesService.saveNote(createNoteDto);
  }

  @Query(() => NoteEntryModel, { name: 'note' })
  async getNote(@Args('id') id: string) {
    return await this.notesService.getNoteById(id);
  }

  @Mutation(() => Boolean, { name: 'delete_note' })
  async deleteNote(@Args('id') id: string) {
    await this.notesService.deleteNoteById(id);
    return true;
  }

  @Mutation(() => NoteEntryModel, { name: 'update_note' })
  async updateNote(
    @Args('id') id: string,
    @Args('updateNoteDto') updateNoteDto: UpdateNoteDTO,
  ) {
    return await this.notesService.updateNoteById(id, updateNoteDto);
  }
}
