import { Injectable } from '@nestjs/common';
import NotesRepository from './notes.repository';
import { CreateNoteDTO, UpdateNoteDTO } from 'src/dtos';
import { NoteEntryModel } from 'src/models';
import { ContentstackError, NoteNotFoundError } from 'src/errors';
import { ContentstackErrorStatusCodes } from 'src/enums';
import { Entry } from '@contentstack/management/types/stack/contentType/entry';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async getAllNotes() {
    return (await this.notesRepository.queryNoteEntries()).items;
  }

  async saveNote(createNoteDto: CreateNoteDTO) {
    const note = new NoteEntryModel(createNoteDto.title, createNoteDto.content);
    try {
      const newNoteEntry = await this.notesRepository.createNoteEntry(note);
      await this.notesRepository.publishNoteEntry(newNoteEntry.uid);
      return newNoteEntry;
    } catch (err) {
      throw new ContentstackError(err.status, err.errorMessage, err.errors);
    }
  }

  async getNoteById(id: string) {
    try {
      return await this.notesRepository.queryNoteEntry(id);
    } catch (err) {
      throw new NoteNotFoundError(err.errors);
    }
  }

  async deleteNoteById(id: string) {
    try {
      await this.notesRepository.deleteNoteEntry(id);
    } catch (err) {}
  }

  async updateNoteById(id: string, updateNoteDto: UpdateNoteDTO) {
    try {
      const oldNoteEntry = (await this.notesRepository.queryNoteEntry(
        id,
      )) as unknown as Entry;
      const newNote = new NoteEntryModel(
        updateNoteDto.title ?? oldNoteEntry.title,
        updateNoteDto.content ?? oldNoteEntry.content,
      );
      const updatedNoteentry = await this.notesRepository.updateNoteEntry(
        oldNoteEntry,
        newNote,
      );
      await this.notesRepository.publishNoteEntry(id);
      return updatedNoteentry;
    } catch (err) {
      if (err.errorCode === ContentstackErrorStatusCodes.OBJECT_NOT_FOUND) {
        throw new NoteNotFoundError(err.errors);
      }
      throw new ContentstackError(err.status, err.errorMessage, err.errors);
    }
  }
}
