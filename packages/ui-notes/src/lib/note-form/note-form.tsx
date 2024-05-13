import { RemixFormWrapper } from 'ui-link';
import { FormInput } from 'ui-notes';
import { NOTE_FORM_SAVE_BUTTON_TEXT, NoteEntryModel, noteFormStructure, } from 'ui-shared';

interface Props {
  className?: string;
  title?: string;
  content?: string;
  uid?: string;
  formData: any;
}

export default function NoteForm(props: Props) {
  return (
    <RemixFormWrapper method="post" className={props.className}>
        <>
            {props.formData?.errorMessage && (
                <p className="text-red-700">{props.formData.errorMessage}</p>
            )}
            {Object.keys(noteFormStructure).map((key) => {
                const inputData = noteFormStructure[key as keyof NoteEntryModel];

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
        </>
    </RemixFormWrapper>
  );
}
