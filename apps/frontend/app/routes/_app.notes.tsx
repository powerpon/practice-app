import { Outlet, useLoaderData } from '@remix-run/react';
import { NoteList } from '@packages/ui-notes';
import { endpoints } from '~/services/endpoints';
import { NotesQuery } from '@packages/ui-shared';

export default function NotesPage() {
  const notesGqlData: NotesQuery = useLoaderData();

  return (
    <main className="flex justify-center items-center bg-blue-100 grow">
      <NoteList notes={notesGqlData.notes} />
      <Outlet />
    </main>
  );
}

export async function loader() {
  return await endpoints.getNotes();
}
