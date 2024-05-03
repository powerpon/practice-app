import { Form, useActionData } from '@remix-run/react';
import {
  NOTE_CONTENT_LABEL_TEXT,
  NOTE_FORM_CONTENT_INPUT_PLACEHOLDER_TEXT,
  NOTE_FORM_SAVE_BUTTON_TEXT,
  NOTE_FORM_TITLE_INPUT_PLACEHOLDER_TEXT,
  NOTE_TITLE_LABEL_TEXT,
} from '~/constants/constants';
import styleLink from './NoteForm.css?url';
import { LinksFunction } from '@remix-run/node';

interface Props {
  className?: string;
}

export default function NoteForm(props: Props) {
  const data: any = useActionData();

  return (
    <Form method="post" id="note-form" className={props.className}>
      {data?.errorMessage && (
        <p className="text-red-700">{data.errorMessage}</p>
      )}
      <label className="labels" htmlFor="title">
        {NOTE_TITLE_LABEL_TEXT}
      </label>
      <input
        id="title"
        placeholder={NOTE_FORM_TITLE_INPUT_PLACEHOLDER_TEXT}
        type="text"
        required
        name="title"
      />
      <label className="labels" htmlFor="content">
        {NOTE_CONTENT_LABEL_TEXT}
      </label>
      <textarea
        placeholder={NOTE_FORM_CONTENT_INPUT_PLACEHOLDER_TEXT}
        rows={5}
        id="content"
        required
        name="content"
      ></textarea>
      <button
        className="bg-green-300 px-5 py-2 w-fit mt-4 self-end rounded-lg hover:bg-green-500"
        type="submit"
      >
        {NOTE_FORM_SAVE_BUTTON_TEXT}
      </button>
    </Form>
  );
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styleLink },
];
