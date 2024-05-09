import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import NotesRepository from './notes.repository';
import { CreateNoteDTO, UpdateNoteDTO } from 'src/dtos';
import { noteEntryMock, errorMock, contentstackResponseMock, contentstackCollectionMock } from 'src/constants/mock-constants';

class NotesRepositoryMock {
  queryNoteEntries = jest.fn().mockResolvedValue(contentstackCollectionMock);
  createNoteEntry = jest.fn().mockResolvedValue(noteEntryMock);
  publishNoteEntry = jest.fn().mockResolvedValue(contentstackResponseMock);
  queryNoteEntry = jest.fn().mockResolvedValue(noteEntryMock);
  unpublishNoteEntry = jest.fn().mockResolvedValue(contentstackResponseMock);
  deleteNoteEntry = jest.fn();
  updateNoteEntry = jest.fn().mockResolvedValue(noteEntryMock);
}

describe('NotesService', () => {
  let service: NotesService;
  let repository: NotesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService, { provide: NotesRepository, useClass: NotesRepositoryMock }],
    }).compile();
    service = module.get<NotesService>(NotesService);
    repository = module.get<NotesRepository>(NotesRepository);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getAllNotes', () => {
    it('should return all notes', async () => {
        expect(await service.getAllNotes()).toEqual([noteEntryMock]);
    });
  });

  describe('saveNote', () => {
    const createNoteDtoMock: CreateNoteDTO = {
      title: noteEntryMock.title,
      content: noteEntryMock.content,
    };

    it('should return newly saved note', async () => {
        expect(await service.saveNote(createNoteDtoMock)).toEqual(noteEntryMock);
    });

    it('should return an error when error thrown by repository', async () => {
      jest.spyOn(repository, 'createNoteEntry').mockRejectedValueOnce(errorMock);
      expect(await service.saveNote(createNoteDtoMock)).toEqual(errorMock);
    });
  });

  describe('getNoteById', () => {
    it('should return a note by its id', async () => {
      expect(await service.getNoteById(noteEntryMock.uid)).toEqual(noteEntryMock);
    });

    it('should return an error when error thrown by repository', async () => {
      jest.spyOn(repository, 'queryNoteEntry').mockRejectedValueOnce(errorMock);
      expect(await service.getNoteById(noteEntryMock.uid)).toEqual(errorMock);
    });
  });

  describe('deleteNoteById', () => {
    it('should delete a note by its id', async () => {
      await service.deleteNoteById(noteEntryMock.uid);
      expect(repository.deleteNoteEntry).toHaveBeenCalledWith(noteEntryMock.uid);
    });
  });

  describe('updateNoteById', () => {
    const updateNoteDtoMock: UpdateNoteDTO = {
      title: noteEntryMock.title
    };

    it('should retrun updated note', async () => {
      expect(await service.updateNoteById(noteEntryMock.uid, updateNoteDtoMock)).toEqual(noteEntryMock);
    });

    it('should return an error when error thrown by repository', async () => {
      jest.spyOn(repository, 'updateNoteEntry').mockRejectedValueOnce(errorMock);
      expect(await service.updateNoteById(noteEntryMock.uid, updateNoteDtoMock)).toEqual(errorMock);
    });
  });
});