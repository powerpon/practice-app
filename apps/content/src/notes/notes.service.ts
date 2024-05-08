import { Injectable } from '@nestjs/common';
import NotesRepository from './notes.repository';
import { CreateNoteDTO, UpdateNoteDTO } from 'src/dtos';
import { NoteEntryModel } from 'src/models';
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
      return err;
    }
  }

  async getNoteById(id: string) {
    try {
      return await this.notesRepository.queryNoteEntry(id);
    } catch (err) {
      return err;
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
      return err;
    }
  }
}
