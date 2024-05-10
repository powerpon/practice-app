import { redirect } from '@remix-run/node';
import { saveNote } from '~/graphql/queries';
import { NoteForm } from '@packages/ui-notes';
import {
  CREATE_NOTE_PAGE_TITLE_TEXT,
  NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
  NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
  navigation,
  generateInputValidationError,
  generateReadableContentstackErrorMessage,
  ContentstackError,
  GraphQLData,
  GraphQLError,
  GraphQLSaveNoteData,
  NoteObject,
} from '@packages/ui-shared';
import { endpoints } from '~/services/endpoints';
import { useActionData } from '@remix-run/react';

export default function CreateNotePage() {
  const formData: any = useActionData();

  return (
    <main className="flex flex-col items-center bg-blue-100 grow">
      <h1 className="text-gray-500 text-3xl py-10">
        {CREATE_NOTE_PAGE_TITLE_TEXT}
      </h1>
      <NoteForm className="pt-10 w-2/5 flex flex-col" formData={formData} />
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
    `../../${navigation.notesPage.uri}/${note.data.create_note.uid}`,
  );
}
