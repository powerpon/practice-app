import { redirect } from '@remix-run/node';
import { navigation } from '~/components/constants/constants';

export default function Index() {
  return <></>;
}

export async function loader() {
  return redirect(navigation.notesPage.uri);
}
