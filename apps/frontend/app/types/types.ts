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
