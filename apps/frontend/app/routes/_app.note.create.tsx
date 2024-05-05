import { LinksFunction, redirect } from '@remix-run/node';
import { saveNote } from '~/graphql/queries';
import { links as NoteFormStyleLinks } from '~/components/NoteForm/NoteForm';
import { NoteForm } from '~/components';
import {
  CREATE_NOTE_PAGE_TITLE_TEXT,
  NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
  NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
  navigation,
} from '~/constants/constants';
import {
  generateInputValidationError,
  generateReadableContentstackErrorMessage,
} from '~/helpers';
import { endpoints } from '~/services/endpoints';
import {
  ContentstackError,
  GraphQLData,
  GraphQLError,
  GraphQLSaveNoteData,
  NoteObject,
} from '~/types/types';

export default function CreateNotePage() {
  return (
    <main className="flex flex-col items-center bg-blue-100 grow">
      <h1 className="text-gray-500 text-3xl py-10">
        {CREATE_NOTE_PAGE_TITLE_TEXT}
      </h1>
      <NoteForm className="pt-10 w-2/5 flex flex-col" />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData) as NoteObject;
  noteData.title = noteData.title.trim();
  noteData.content = noteData.content.trim();
  if (noteData.title.length < 1) {
    return generateInputValidationError(
      NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
    );
  }
  if (noteData.content.length < 1) {
    return generateInputValidationError(
      NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
    );
  }
  const note = (await endpoints.graphQLRequest(saveNote(noteData))).data as
    | GraphQLData<GraphQLSaveNoteData>
    | GraphQLError;
  if ('errors' in note) {
    const contentstackError = JSON.parse(
      note.errors[0].message,
    ) as ContentstackError;
    return generateInputValidationError(
      generateReadableContentstackErrorMessage(contentstackError.errors),
    );
  }
  return redirect(
    `../../${navigation.notesPage.uri}/${note.data.saveNote.uid}`,
  );
}

export const links: LinksFunction = () => [...NoteFormStyleLinks()];
