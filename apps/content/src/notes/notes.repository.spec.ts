import { Test, TestingModule } from "@nestjs/testing";
import NotesRepository from "./notes.repository";
import { Entry } from "@contentstack/management/types/stack/contentType/entry";
import { contentstackCollectionMock, noteEntryMock, contentstackResponseMock } from "src/constants/mock-constants";

var deleteFnMock: jest.Mock<any, any, any>;

jest.mock('@contentstack/management', () => {
    const { contentstackCollectionMock, contentstackResponseMock, noteEntryMock } = require("src/constants/mock-constants");
    
    deleteFnMock = jest.fn();

    return {
        client: jest.fn().mockReturnValue({
            stack: jest.fn().mockReturnValue({
                contentType: jest.fn().mockReturnValue({
                    entry: jest.fn().mockReturnValue({
                        query: jest.fn().mockReturnValue({
                            find: jest.fn().mockReturnValue(contentstackCollectionMock)
                        }),
                        fetch: jest.fn().mockReturnValue(noteEntryMock),
                        create: jest.fn().mockReturnValue(noteEntryMock),
                        publish: jest.fn().mockReturnValue(contentstackResponseMock),
                        unpublish: jest.fn().mockReturnValue(contentstackResponseMock),
                        delete: deleteFnMock
                    })
                })
            })
        })
    }
});

const entryMock: Entry = {
    setWorkflowStage: jest.fn(),
    locales:  jest.fn(),
    publish:  jest.fn(),
    unpublish:  jest.fn(),
    uid: noteEntryMock.uid,
    update:  jest.fn().mockReturnValue(noteEntryMock),
    fetch:  jest.fn(),
    delete:  jest.fn()
}

describe('NotesRepository', () => {
    let repository: NotesRepository;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [NotesRepository],
      }).compile();
      repository = module.get<NotesRepository>(NotesRepository);
    });
  
    it('repository should be defined', () => {
      expect(repository).toBeDefined();
    });

    describe('queryNoteEntries', () => {
        it('should return note entries', async () => {
            expect(await repository.queryNoteEntries()).toEqual(contentstackCollectionMock);
        });
    });

    describe('createNoteEntry', () => {
        it('should return created note entry', async () => {
            expect(await repository.createNoteEntry(noteEntryMock)).toEqual(noteEntryMock);
        });
    });

    describe('publishNoteEntry', () => {
        it('should return published note entry notice', async () => {
            expect(await repository.publishNoteEntry(noteEntryMock.uid)).toEqual(contentstackResponseMock);
        });
    });

    describe('queryNoteEntry', () => {
        it('should return note entry by id', async () => {
            expect(await repository.queryNoteEntry(noteEntryMock.uid)).toEqual(noteEntryMock);
        });
    });

    describe('unpublishNoteEntry', () => {
        it('should return unpublished note entry notice', async () => {
            expect(await repository.unpublishNoteEntry(noteEntryMock.uid)).toEqual(contentstackResponseMock);
        });
    });

    describe('deleteNoteEntry', () => {
        it('should delete note entry by id', async () => {
            await repository.deleteNoteEntry(noteEntryMock.uid);
            expect(deleteFnMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateNoteEntry', () => {
        it('should return updated note entry', async () => {
            expect(await repository.updateNoteEntry(entryMock, noteEntryMock)).toEqual(noteEntryMock);
        });
    });
});  