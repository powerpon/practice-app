import { getNote } from 'graphql/queries';
import Note from '~/components/Note/Note';
import { endpoints } from '~/services/endpoints';

export default function NotePage() {
  return <Note />;
}

export async function loader({ params }) {
  return (await endpoints.graphQLRequest(getNote(params.noteId))).data;
}
