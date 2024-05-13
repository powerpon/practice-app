import { 
  Create_NoteDocument,
  Delete_NoteDocument, 
  MutationCreate_NoteArgs, 
  MutationDelete_NoteArgs, 
  MutationUpdate_NoteArgs, 
  NoteDocument, 
  NotesDocument, 
  QueryNoteArgs, 
  Update_NoteDocument 
} from '@packages/ui-shared';
import { GraphQLClient } from 'graphql-request';
import { appConfig } from '~/config';

const client = new GraphQLClient(appConfig.graphqlEndpoint);

export const endpoints = {
  async getNotes() {
    return await client.request(NotesDocument);
  },
  async getNoteById(variables: QueryNoteArgs) {
    return await client.request(NoteDocument, variables);
  },
  async deleteNoteById(variables: MutationDelete_NoteArgs) {
    return await client.request(Delete_NoteDocument, variables);
  },
  async updateNoteById(variables: MutationUpdate_NoteArgs) {
    return await client.request(Update_NoteDocument, variables);
  },
  async saveNote(variables: MutationCreate_NoteArgs) {
    return await client.request(Create_NoteDocument, variables);
  }
};
