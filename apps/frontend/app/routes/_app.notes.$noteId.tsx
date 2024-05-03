import { redirect } from '@remix-run/node';
import { getNote } from 'graphql/queries';
import Note from '~/components/Note/Note';
import { endpoints } from '~/services/endpoints';

export default function NotePage() {
  return <Note />;
}

export async function loader({ params }) {
  const note = (await endpoints.graphQLRequest(getNote(params.noteId))).data;
  if ('errors' in note) {
    return redirect('..');
  }
  return note;
}
