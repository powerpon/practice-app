export interface GraphQLData<T> {
  data: T;
}

export interface Note {
  title: string;
  content: string;
  uid: string;
  created_at: string;
}

export interface GraphQLGetNotesData {
  getNotes: Note[];
}

export interface GraphQLGetNoteData {
  getNote: Note;
}

export interface GraphQLSaveNoteData {
  saveNote: Note;
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
