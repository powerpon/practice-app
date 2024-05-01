export const GET_ALL_NOTES = `
    query GetNotes {
        getNotes {
            title,
            content,
            uid,
        }
    }
`;
