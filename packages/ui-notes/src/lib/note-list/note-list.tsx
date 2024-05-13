import { RemixNavLinkWrapper } from 'ui-link';
import { NoteEntryModel } from 'ui-shared';

interface Props {
    notes: NoteEntryModel[];
}

export default function NoteList(props: Props) {
  return (
    <ul className="flex flex-col justify-evenly items-center w-full self-stretch">
      {props.notes.map((note) => (
        <li
          key={note.uid}
          className="bg-pink-400 hover:bg-pink-600 
                        cursor-pointer w-1/2 rounded-lg 
                        overflow-hidden my-4"
        >
          <RemixNavLinkWrapper
            to={note.uid}
            className={({ isActive }) =>
              `flex justify-center text-white text-2xl items-center w-full py-4 ${isActive ? '!bg-pink-800' : ''}`
            }
          >
            {note.title}
          </RemixNavLinkWrapper>
        </li>
      ))}
    </ul>
  );
}
