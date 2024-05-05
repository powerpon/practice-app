import { InputTypes } from '~/enums';
import { convertISODateToNativeDate } from '~/helpers';
import { NavigationObject, NoteFormStructure, NoteItemDisplayObject } from '~/types/types';

export const navigation: NavigationObject = {
  notesPage: {
    uri: '/notes',
    label: 'Notes',
    isNavbarItem: true,
  },
  createNotePage: {
    uri: '/note/create',
    label: 'Create Note',
    isNavbarItem: true,
  },
  editNotePage: {
    uri: '/edit',
  },
};

export const NOTE_TITLE_LABEL_TEXT = 'Title: ';
export const NOTE_CONTENT_LABEL_TEXT = 'Content: ';
export const NOTE_CREATION_DATE_LABEL_TEXT = 'Creation Date: ';
export const X_CLOSE_BUTTON_TEXT = 'X';
export const CREATE_NOTE_PAGE_TITLE_TEXT = 'Create New Note';
export const NOTE_FORM_TITLE_INPUT_PLACEHOLDER_TEXT = 'Baking';
export const NOTE_FORM_CONTENT_INPUT_PLACEHOLDER_TEXT =
  'Reminder to bake a cake tomorrow';
export const NOTE_FORM_SAVE_BUTTON_TEXT = 'Save';
export const NOTE_FORM_TITLE_INPUT_ERROR_MESSAGE_TEXT =
  'Please enter note title';
export const NOTE_FORM_CONTENT_INPUT_ERROR_MESSAGE_TEXT =
  'Please enter note content';
export const EDIT_NOTE_PAGE_TITLE_TEXT = 'Edit Note';
export const ERROR_PAGE_TITLE_TEXT = 'Page Does Not Exist';
export const ERROR_PAGE_HOME_LINK_TEXT = 'Back to homepage';

export const noteItem: NoteItemDisplayObject = {
  title: {
    className: 'text-3xl',
    text: NOTE_TITLE_LABEL_TEXT,
  },
  content: {
    className: 'text-xl py-4',
    text: NOTE_CONTENT_LABEL_TEXT,
  },
  created_at: {
    text: NOTE_CREATION_DATE_LABEL_TEXT,
    helperFunction: convertISODateToNativeDate,
  },
};

export const noteFormStructure: NoteFormStructure = {
  title: {
    inputType: InputTypes.TEXT,
    inputId: 'title',
    labelText: NOTE_TITLE_LABEL_TEXT,
    inputPlaceholder: NOTE_FORM_TITLE_INPUT_PLACEHOLDER_TEXT,
    inputName: 'title',
  },
  content: {
    inputType: InputTypes.TEXTAREA,
    inputId: 'content',
    labelText: NOTE_CONTENT_LABEL_TEXT,
    inputPlaceholder: NOTE_FORM_CONTENT_INPUT_PLACEHOLDER_TEXT,
    inputName: 'content',
    textareaRows: 5,
  },
};
