import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO, UpdateNoteDTO } from 'src/dtos';
import { Response } from 'express';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes() {
    return await this.notesService.getAllNotes();
  }

  @Post()
  async saveNote(@Body() createNoteDto: CreateNoteDTO) {
    return await this.notesService.saveNote(createNoteDto);
  }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    return await this.notesService.getNoteById(id);
  }

  @Delete(':id')
  async deleteNote(@Res() response: Response, @Param('id') id: string) {
    await this.notesService.deleteNoteById(id);
    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Patch(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDTO,
  ) {
    return await this.notesService.updateNoteById(id, updateNoteDto);
  }
}
