import { redirect, useActionData, useOutletContext } from '@remix-run/react';
import { CloseButton, NoteForm } from '@packages/ui-notes';
import {
  EDIT_NOTE_PAGE_TITLE_TEXT,
  NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
  NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
  generateInputValidationError,
  generateReadableContentstackErrorMessage,
  ContentstackError,
  GraphQLData,
  GraphQLError,
  GraphQLGetNoteData,
  GraphQLSaveNoteData,
  NoteObject,
} from '@packages/ui-shared';
import { updateNote } from '~/graphql/queries';
import { endpoints } from '~/services/endpoints';

export default function EditNotePage() {
  const noteGqlData: GraphQLData<GraphQLGetNoteData> = useOutletContext();
  const formData: any = useActionData();

  return (
    <article className="bg-red-300 w-4/5 flex flex-col items-center relative">
      <CloseButton />
      <p className="text-3xl py-10">{EDIT_NOTE_PAGE_TITLE_TEXT}</p>
      <NoteForm
        uid={noteGqlData.data.note.uid}
        title={noteGqlData.data.note.title}
        content={noteGqlData.data.note.content}
        className="flex flex-col w-1/2 pb-10"
        formData={formData}
      />
    </article>
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
  const { uid, ...updateNoteDto } = noteData;
  const note = (
    await endpoints.graphQLRequest(
      updateNote(noteData.uid, updateNoteDto as NoteObject),
    )
  ).data as GraphQLData<GraphQLSaveNoteData> | GraphQLError;
  if ('errors' in note) {
    const contentstackError = JSON.parse(
      note.errors[0].message,
    ) as ContentstackError;
    return generateInputValidationError(
      generateReadableContentstackErrorMessage(contentstackError.errors),
    );
  }
  return redirect(`..`);
}
