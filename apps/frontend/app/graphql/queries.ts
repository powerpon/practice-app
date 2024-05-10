import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { NoteObject } from '@packages/ui-shared';

export const getAllNotes = () =>
  jsonToGraphQLQuery({
    query: {
      notes: {
        title: true,
        uid: true,
      },
    },
  });

export const getNote = (id: string) =>
  jsonToGraphQLQuery({
    query: {
      note: {
        __args: {
          id,
        },
        title: true,
        content: true,
        uid: true,
        created_at: true,
      },
    },
  });

export const saveNote = (createNoteDto: NoteObject) =>
  jsonToGraphQLQuery({
    mutation: {
      create_note: {
        __args: {
          createNoteDto,
        },
        title: true,
        content: true,
        uid: true,
        created_at: true,
      },
    },
  });

export const deleteNote = (id: string) =>
  jsonToGraphQLQuery({
    mutation: {
      delete_note: {
        __args: {
          id,
        },
      },
    },
  });

export const updateNote = (id: string, updateNoteDto: NoteObject) =>
  jsonToGraphQLQuery({
    mutation: {
      update_note: {
        __args: {
          id,
          updateNoteDto,
        },
        title: true,
        content: true,
        uid: true,
        created_at: true,
      }
    }
  });
