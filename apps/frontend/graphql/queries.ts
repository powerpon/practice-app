export const getAllNotes = () => `
    query GetNotes {
        getNotes {
            title,
            uid,
        }
    }
`;

export const getNote = (id: string) => `
    query GetNote {
        getNote(id: "${id}") {
            title
            content
            uid
            created_at
        }
    }
`;
