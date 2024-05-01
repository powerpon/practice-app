import type { LinksFunction, MetaFunction } from "@remix-run/node";
import axios from "axios";
import { GET_ALL_NOTES } from "graphql/queries";
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
  return (await axios.post(process.env.GRAPHQL_ENDPOINT as string, { query: GET_ALL_NOTES })).data;
}

export const links: LinksFunction = () => [
  ...NoteListStyleLinks(),
];
