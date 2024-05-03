import { Outlet } from "@remix-run/react";
import { getAllNotes } from "graphql/queries";
import NoteList from "~/components/NoteList/NoteList";
import { endpoints } from "~/services/endpoints";

export default function NotesPage() {
  return (
    <main className="flex justify-center items-center bg-blue-100 grow">
      <NoteList />
      <Outlet />
    </main>
  );
}

export async function loader() {
  return (await endpoints.graphQLRequest(getAllNotes())).data;
}
