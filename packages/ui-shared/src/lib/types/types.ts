import { InputTypes } from '../enums';
import { NoteEntryModel } from '../graphql/generated/notes.gen';

export interface GraphQLError {
  errors: [
    {
      message: string;
    }
  ]
}

export interface ContentstackError {
  errors: object;
}

export interface NavigationItem {
  uri: string;
  label?: string;
  isNavbarItem?: boolean;
}

export interface NavigationObject {
  [key: string]: NavigationItem;
}

export type NoteItemDisplayObject = {
  [key in keyof NoteEntryModel]?: {
    className?: string;
    text: string;
    helperFunction?: (...args: any[]) => any;
  };
};

export type NoteFormStructure = {
  [key in keyof NoteEntryModel]?: {
    inputType: InputTypes;
    inputId?: string;
    labelText?: string;
    inputPlaceholder?: string;
    inputName?: string;
    textareaRows?: number;
  }
}
