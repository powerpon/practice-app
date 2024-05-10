import { redirect } from '@remix-run/node';
import { navigation } from '@packages/ui-shared';

export default function Index() {
  return <></>;
}

export async function loader() {
  return redirect(navigation.notesPage.uri);
}
