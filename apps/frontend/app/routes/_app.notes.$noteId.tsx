import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { deleteNote, getNote } from '~/graphql/queries';
import Note from '~/components/Note/Note';
import { endpoints } from '~/services/endpoints';
import { GraphQLData, GraphQLGetNoteData } from '~/types/types';

export default function NotePage() {
  const note: GraphQLData<GraphQLGetNoteData> = useLoaderData();

  return (
    <Form
      method="post"
      className="fixed bottom-2 w-full flex items-center flex-col"
    >
      <Note />
      <button type="submit" name="deleteId" value={note.data.getNote.uid}>
        <FontAwesomeIcon
          className="p-2 bg-red-500 hover:bg-red-600 mt-2 rounded-full border border-black"
          icon={faTrashCan}
        />
      </button>
    </Form>
  );
}

export async function loader({ params }) {
  const note = (await endpoints.graphQLRequest(getNote(params.noteId))).data;
  if ('errors' in note) {
    return redirect('..');
  }
  return note;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteId = formData.get('deleteId');
  if (noteId) {
    await endpoints.graphQLRequest(deleteNote(noteId as string));
  }
  return redirect('..');
}
