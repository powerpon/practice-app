import { Form, useActionData } from '@remix-run/react';
import {
  NOTE_FORM_SAVE_BUTTON_TEXT,
  noteFormStructure,
} from '~/constants/constants';
import FormInput from '../FormInput/FormInput';
import { NoteObject } from '~/types/types';

interface Props {
  className?: string;
  title?: string;
  content?: string;
  uid?: string;
}

export default function NoteForm(props: Props) {
  const data: any = useActionData();

  return (
    <Form method="post" className={props.className}>
      {data?.errorMessage && (
        <p className="text-red-700">{data.errorMessage}</p>
      )}
      {Object.keys(noteFormStructure).map((key) => {
        const inputData = noteFormStructure[key as keyof NoteObject];
        return (
          <FormInput
            key={key}
            inputType={inputData!.inputType}
            labelClassName="block text-lg font-bold pt-4"
            inputId={inputData!.inputId}
            labelText={inputData!.labelText}
            inputPlaceholder={inputData!.inputPlaceholder}
            inputName={inputData!.inputName}
            inputDefaultValue={props[key as keyof Props]}
            textareaRows={inputData!.textareaRows}
          />
        );
      })}
      <button
        className="bg-green-300 px-5 py-2 w-fit mt-4 self-end rounded-lg hover:bg-green-500"
        type="submit"
        name={props.uid && 'uid'}
        value={props.uid}
      >
        {NOTE_FORM_SAVE_BUTTON_TEXT}
      </button>
    </Form>
  );
}
