import { LinksFunction } from '@remix-run/node';
import styleLink from './NoteList.css?url';
import { useLoaderData } from '@remix-run/react';
import { GraphQLData, GraphQLGetNotesData } from '~/types/types';

export default function NoteList(){
    const notes: GraphQLData<GraphQLGetNotesData> = useLoaderData();

    return (
        <ul className="flex flex-col justify-evenly items-center h-full w-full">
            {notes.data.getNotes.map(
                (note) => <li key={note.uid} className='note-item'>{note.title}</li>
            )}
        </ul>
    );
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styleLink },
];
