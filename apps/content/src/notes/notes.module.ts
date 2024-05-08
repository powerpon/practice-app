import { Module } from '@nestjs/common';
import { NotesResolver } from './notes.resolver';
import { NotesService } from './notes.service';
import NotesRepository from './notes.repository';

@Module({
  providers: [NotesRepository, NotesService, NotesResolver],
})
export class NotesModule {}
