import { Outlet, useLoaderData } from '@remix-run/react';
import { getAllNotes } from '~/graphql/queries';
import { NoteList } from '@packages/ui-notes';
import { endpoints } from '~/services/endpoints';
import { GraphQLData, GraphQLGetNotesData } from '@packages/ui-shared';

export default function NotesPage() {
  const notesGqlData: GraphQLData<GraphQLGetNotesData> = useLoaderData();

  return (
    <main className="flex justify-center items-center bg-blue-100 grow">
      <NoteList notes={notesGqlData.data.notes} />
      <Outlet />
    </main>
  );
}

export async function loader() {
  return (await endpoints.graphQLRequest(getAllNotes())).data;
}
