import { NavLink, useLoaderData } from '@remix-run/react';
import { GraphQLData, GraphQLGetNoteData } from '~/types/types';
import { convertISODateToNativeDate } from '../../helpers';
import {
  NOTE_CONTENT_LABEL_TEXT,
  NOTE_CREATION_DATE_LABEL_TEXT,
  NOTE_TITLE_LABEL_TEXT,
  X_CLOSE_BUTTON_TEXT,
} from '../../constants/constants';
import CloseButton from '../CloseButton/CloseButton';

export default function Note() {
  const note: GraphQLData<GraphQLGetNoteData> = useLoaderData();

  return (
    <article className="relative py-6 bg-red-200 w-3/4 rounded-sm flex flex-col items-center">
      <CloseButton />
      <p className="text-3xl">
        {NOTE_TITLE_LABEL_TEXT + note.data.getNote.title}
      </p>
      <p className="text-xl py-4">
        {NOTE_CONTENT_LABEL_TEXT + note.data.getNote.content}
      </p>
      <p>
        {NOTE_CREATION_DATE_LABEL_TEXT +
          convertISODateToNativeDate(note.data.getNote.created_at)}
      </p>
    </article>
  );
}
