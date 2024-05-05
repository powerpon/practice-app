import { InputTypes } from '~/enums';

interface Props {
  inputType: InputTypes;
  labelText?: string;
  inputPlaceholder?: string;
  inputDefaultValue?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputId?: string;
  inputName?: string;
  textareaRows?: number;
}

export default function FormInput(props: Props) {
  const handleInputGeneration = () => {
    switch (props.inputType) {
      case InputTypes.TEXTAREA:
        return (
          <textarea
            className={props.inputClassName}
            id={props.inputId}
            name={props.inputName}
            placeholder={props.inputPlaceholder}
            defaultValue={props.inputDefaultValue}
            rows={props.textareaRows}
          />
        );
      default:
        return (
          <input
            className={props.inputClassName}
            id={props.inputId}
            name={props.inputName}
            type={props.inputType}
            placeholder={props.inputPlaceholder}
            defaultValue={props.inputDefaultValue}
          />
        );
    }
  };

  return (
    <>
      {props.labelText && (
        <label className={props.labelClassName} htmlFor={props.inputId}>
          {props.labelText}
        </label>
      )}
      {handleInputGeneration()}
    </>
  );
}
