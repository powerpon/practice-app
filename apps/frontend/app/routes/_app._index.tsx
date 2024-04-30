import type { LinksFunction, MetaFunction } from "@remix-run/node";
import NoteList, {links as NoteListStyleLinks} from "~/components/NoteList/NoteList";

export const meta: MetaFunction = () => {
  return [
    { title: "Notes App" },
  ];
};

export default function Index() {
  return (
    <main className="flex justify-center items-center bg-blue-100 h-full">
      <NoteList />
    </main>
  );
}

export async function loader() {
  
}

export const links: LinksFunction = () => [
  ...NoteListStyleLinks(),
];
