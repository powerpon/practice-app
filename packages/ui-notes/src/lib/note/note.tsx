import { noteItem, NoteObject } from 'ui-shared';
import CloseButton from '../close-button/close-button';

interface Props {
    note: NoteObject;
}

export default function Note(props: Props) {
  return (
    <article className="relative py-6 bg-red-200 w-3/4 rounded-sm flex flex-col items-center">
      <CloseButton />
      {Object.keys(noteItem).map((key) => {
        const itemDisplayTemplate = noteItem[key as keyof NoteObject];
        const noteDataField = props.note[key as keyof NoteObject];
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
