import { redirect, useActionData, useOutletContext } from '@remix-run/react';
import { CloseButton, NoteForm } from '@packages/ui-notes';
import {
  EDIT_NOTE_PAGE_TITLE_TEXT,
  NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
  NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
  generateInputValidationError,
  generateReadableContentstackErrorMessage,
  ContentstackError,
  NoteEntryModel,
} from '@packages/ui-shared';
import { endpoints } from '~/services/endpoints';
import { ClientError } from 'graphql-request';

export default function EditNotePage() {
  const noteGqlData: NoteEntryModel = useOutletContext();
  const formData: any = useActionData();

  return (
    <article className="bg-red-300 w-4/5 flex flex-col items-center relative">
      <CloseButton />
      <p className="text-3xl py-10">{EDIT_NOTE_PAGE_TITLE_TEXT}</p>
      <NoteForm
        uid={noteGqlData.uid}
        title={noteGqlData.title}
        content={noteGqlData.content}
        className="flex flex-col w-1/2 pb-10"
        formData={formData}
      />
    </article>
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
    const { uid, ...updateNoteDto } = noteData;
    await endpoints.updateNoteById(
        { id: uid, updateNoteDto: updateNoteDto },
    );
    return redirect(`..`);
  }
  catch (err) {
    if(err instanceof ClientError) {
      const contentstackError: ContentstackError = JSON.parse(
        err.response.errors![0].message,
      );
      return generateInputValidationError(
        generateReadableContentstackErrorMessage(contentstackError.errors),
      );
    }
    throw err;
  }
}
