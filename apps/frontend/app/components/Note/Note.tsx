import { useLoaderData } from '@remix-run/react';
import { GraphQLData, GraphQLGetNoteData, NoteObject } from '~/types/types';
import { noteItem } from '../../constants/constants';
import CloseButton from '../CloseButton/CloseButton';

export default function Note() {
  const noteData: GraphQLData<GraphQLGetNoteData> = useLoaderData();

  return (
    <article className="relative py-6 bg-red-200 w-3/4 rounded-sm flex flex-col items-center">
      <CloseButton />
      {Object.keys(noteItem).map((key) => {
        const itemDisplayTemplate = noteItem[key as keyof NoteObject];
        const noteDataField = noteData.data.note[key as keyof NoteObject];
        return (
          <p key={key} className={itemDisplayTemplate?.className}>
            {itemDisplayTemplate?.helperFunction
              ? itemDisplayTemplate?.text +
                itemDisplayTemplate?.helperFunction(noteDataField)
              : itemDisplayTemplate?.text + noteDataField}
          </p>
        );
      })}
    </article>
  );
}
