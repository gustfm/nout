import Note from "../../Notes/Models/Note";

const sortNotes = (notes: Note[]): Note[] => {
    return notes.sort((a, b) => {
        return a.updatedAt > b.updatedAt ? -1 : 1;
    });
};

export { sortNotes };
