import { useLoaderData } from '@remix-run/react';
import { GraphQLData, GraphQLGetNoteData, NoteObject } from '~/types/types';
import { noteItem } from '../../constants/constants';
import CloseButton from '../CloseButton/CloseButton';

export default function Note() {
  const note: GraphQLData<GraphQLGetNoteData> = useLoaderData();

  return (
    <article className="relative py-6 bg-red-200 w-3/4 rounded-sm flex flex-col items-center">
      <CloseButton />
      {Object.keys(noteItem).map((key) => {
        const itemDisplayTemplate = noteItem[key as keyof NoteObject];
        const noteData = note.data.getNote[key as keyof NoteObject];
        return (
          <p key={key} className={itemDisplayTemplate?.className}>
            {itemDisplayTemplate?.helperFunction
              ? itemDisplayTemplate?.text +
                itemDisplayTemplate?.helperFunction(noteData)
              : itemDisplayTemplate?.text + noteData}
          </p>
        );
      })}
    </article>
  );
}
