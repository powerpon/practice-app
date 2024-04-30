import { LinksFunction } from '@remix-run/node';
import styleLink from './NoteList.css?url';

export default function NoteList(){
    return (
        <ul className="flex flex-col justify-evenly items-center h-full w-full">
            <li className="note-item">hi</li>
            <li>hi</li>
            <li>hi</li>
            <li>hi</li>
        </ul>
    );
}

export async function loader() {
    
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styleLink },
];
