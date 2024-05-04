import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Note } from '~/types/types';

export const getAllNotes = () =>
  jsonToGraphQLQuery({
    query: {
      getNotes: {
        title: true,
        uid: true,
      },
    },
  });

export const getNote = (id: string) =>
  jsonToGraphQLQuery({
    query: {
      getNote: {
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

export const saveNote = (createNoteDto: Note) =>
  jsonToGraphQLQuery({
    mutation: {
      saveNote: {
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
      deleteNote: {
        __args: {
          id,
        },
      },
    },
  });

export const updateNote = (id: string, updateNoteDto: Note) =>
  jsonToGraphQLQuery({
    mutation: {
      updateNote: {
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
