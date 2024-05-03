import { NavLink, useLoaderData } from "@remix-run/react";
import { GraphQLData, GraphQLGetNotesData } from "~/types/types";

export default function NoteList() {
  const notes: GraphQLData<GraphQLGetNotesData> = useLoaderData();

  return (
    <ul className="flex flex-col justify-evenly items-center w-full self-stretch">
      {notes.data.getNotes.map((note) => (
        <li
          key={note.uid}
          className="bg-pink-400 hover:bg-pink-600 
                        cursor-pointer w-1/2 rounded-lg 
                        overflow-hidden my-4"
        >
          <NavLink
            to={note.uid}
            className={({ isActive }) =>
              `flex justify-center text-white text-2xl items-center w-full py-4 ${isActive ? "!bg-pink-800" : ""}`
            }
          >
            {note.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
