import { redirect, useOutletContext } from '@remix-run/react';
import { CloseButton } from '~/components';
import { NoteForm } from '~/components';
import {
  EDIT_NOTE_PAGE_TITLE_TEXT,
  NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT,
  NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT,
  navigation,
} from '~/constants/constants';
import { updateNote } from '~/graphql/queries';
import {
  generateInputValidationError,
  generateReadableContentstackErrorMessage,
} from '~/helpers';
import { endpoints } from '~/services/endpoints';
import {
  ContentstackError,
  GraphQLData,
  GraphQLError,
  GraphQLGetNoteData,
  GraphQLSaveNoteData,
  NoteObject,
} from '~/types/types';

export default function EditNotePage() {
  const note: GraphQLData<GraphQLGetNoteData> = useOutletContext();

  return (
    <article className="bg-red-300 w-4/5 flex flex-col items-center relative">
      <CloseButton />
      <p className="text-3xl py-10">{EDIT_NOTE_PAGE_TITLE_TEXT}</p>
      <NoteForm
        uid={note.data.getNote.uid}
        titleInitialValue={note.data.getNote.title}
        contentInitialValue={note.data.getNote.content}
        className="flex flex-col w-1/2 pb-10"
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
