import { Test, TestingModule } from "@nestjs/testing";
import { NotesResolver } from "./notes.resolver";
import { NotesService } from "./notes.service";
import { CreateNoteDTO, UpdateNoteDTO } from "src/dtos";
import { noteEntryMock } from "src/constants/mock-constants";

class NotesServiceMock {
    getAllNotes = jest.fn().mockResolvedValue([noteEntryMock]);
    saveNote = jest.fn().mockResolvedValue(noteEntryMock);
    getNoteById = jest.fn().mockResolvedValue(noteEntryMock);
    deleteNoteById = jest.fn();
    updateNoteById = jest.fn().mockResolvedValue(noteEntryMock);
}

describe('NotesResolver', () => {
    let resolver: NotesResolver;
    let service: NotesService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [NotesResolver, { provide: NotesService, useClass: NotesServiceMock }],
      }).compile();
      resolver = module.get<NotesResolver>(NotesResolver);
      service = module.get<NotesService>(NotesService);
    });

    it('resolver should be defined', () => {
        expect(resolver).toBeDefined();
    });
  
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('getNotes', () => {
        it('should return all notes', async () => {
            expect(await resolver.getNotes()).toEqual([noteEntryMock]);
        });
    });

    describe('saveNote', () => {
        it('should return saved note', async () => {
            const createNoteDtoMock: CreateNoteDTO = {
                title: noteEntryMock.title,
                content: noteEntryMock.content,
            };
            expect(await resolver.saveNote(createNoteDtoMock)).toEqual(noteEntryMock);
        });
    });

    describe('getNote', () => {
        it('should return note by id', async () => {
            expect(await resolver.getNote(noteEntryMock.uid)).toEqual(noteEntryMock);
        });
    });

    describe('deleteNote', () => {
        it('should delete note by id', async () => {
            await resolver.deleteNote(noteEntryMock.uid);
            expect(service.deleteNoteById).toHaveBeenCalledWith(noteEntryMock.uid);
        });
    });

    describe('updateNote', () => {
        it('should update note by id', async () => {
            const updateNoteDtoMock: UpdateNoteDTO = {
                title: noteEntryMock.title,
            };
            expect(await resolver.updateNote(noteEntryMock.uid, updateNoteDtoMock)).toEqual(noteEntryMock);
        });
    });
});