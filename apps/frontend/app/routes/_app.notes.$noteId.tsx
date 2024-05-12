import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from '@remix-run/node';
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import { Note } from '@packages/ui-notes';
import { endpoints } from '~/services/endpoints';
import { NoteQuery, navigation } from '@packages/ui-shared';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function NotePage() {
  const noteGqlData: NoteQuery = useLoaderData();
  const { pathname } = useLocation();

  return (
    <section className="fixed bottom-2 w-full flex items-center flex-col">
      {pathname.includes(navigation.editNotePage.uri) ? (
        <Outlet context={noteGqlData.note} />
      ) : (
        <Note note={noteGqlData.note} />
      )}
      <Form method="post">
        <NavLink
          className={({ isActive }) => (isActive ? 'hidden' : '')}
          to={`.${navigation.editNotePage.uri}`}
        >
          <FontAwesomeIcon
            className="p-2 bg-blue-500 hover:bg-blue-600 mr-4 rounded-full border border-black"
            icon={faPen}
          />
        </NavLink>
        <button type="submit" name="deleteId" value={noteGqlData.note.uid}>
          <FontAwesomeIcon
            className="p-2 mt-2 bg-red-500 hover:bg-red-600 rounded-full border border-black"
            icon={faTrashCan}
          />
        </button>
      </Form>
    </section>
  );
}

export async function loader({ params }) {
  try {
    return await endpoints.getNoteById({ id: params.noteId });
  } 
  catch(err) {
    return redirect('..');
  }
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const noteId = formData.get('deleteId');
    await endpoints.deleteNoteById({id: noteId});
  } 
  catch(err) {}
  finally {
    return redirect('..');
  }
}
