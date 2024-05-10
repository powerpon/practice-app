import { InputTypes } from '../enums';

export interface GraphQLData<T> {
  data: T;
}

export interface NoteObject {
  title: string;
  content: string;
  uid: string;
  created_at: string;
}

export interface GraphQLGetNotesData {
  notes: NoteObject[];
}

export interface GraphQLGetNoteData {
  note: NoteObject;
}

export interface GraphQLSaveNoteData {
  create_note: NoteObject;
}

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
  [key in keyof NoteObject]?: {
    className?: string;
    text: string;
    helperFunction?: (...args: any[]) => any;
  };
};

export type NoteFormStructure = {
  [key in keyof NoteObject]?: {
    inputType: InputTypes;
    inputId?: string;
    labelText?: string;
    inputPlaceholder?: string;
    inputName?: string;
    textareaRows?: number;
  }
}
