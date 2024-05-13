import { redirect } from '@remix-run/node';
import { NoteForm } from '@packages/ui-notes';
import {
  CREATE_NOTE_PAGE_TITLE_TEXT,
  NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
  NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
  navigation,
  generateInputValidationError,
  generateReadableContentstackErrorMessage,
  ContentstackError,
  NoteEntryModel,
  Create_NoteMutation,
} from '@packages/ui-shared';
import { endpoints } from '~/services/endpoints';
import { useActionData } from '@remix-run/react';
import { ClientError } from 'graphql-request';

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
  try {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData) as NoteEntryModel;
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
    const noteCreateResponse = await endpoints.saveNote({ createNoteDto: noteData }) as Create_NoteMutation;
    return redirect(
      `../../${navigation.notesPage.uri}/${noteCreateResponse.create_note.uid}`,
    );
  }
  catch (err) {
    if (err instanceof ClientError) {
      const contentstackError = JSON.parse(
        err.response.errors![0].message,
      ) as ContentstackError;
      return generateInputValidationError(
        generateReadableContentstackErrorMessage(contentstackError.errors),
      );
    }
  } 
}
