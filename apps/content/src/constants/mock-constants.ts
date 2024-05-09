import { ContentstackCollection, Response } from "@contentstack/management/types/contentstackCollection";
import { NoteEntryModel } from "src/models";

export const noteEntryMock: NoteEntryModel = {
    title: "test title",
    content: "test content",
    uid: "1"
};

export const contentstackCollectionMock: ContentstackCollection<NoteEntryModel> = {
    items: [noteEntryMock],
    count: 1,
    notice: ""
};

export const contentstackResponseMock: Response = {
    notice: "test response"
};

export const errorMock: Error = {
    name: 'test error',
    message: 'test error message'
};
