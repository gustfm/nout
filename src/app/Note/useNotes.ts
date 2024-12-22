import { ref, shallowRef } from "vue";
import Note from "./Note";
import { orderBy } from "lodash";
import NotesRepository from "src/lib/NotesRepository";

export const useNotes = (notesRepository: NotesRepository) => {
    const notes = ref<Array<Note>>([]);
    const selectedNote = ref<Note>(null);
    const isNotesLoaded = shallowRef<Boolean>(false);

    const loadNotes = async () => {
        const results = await notesRepository.getAll();
        notes.value = orderBy(results, ["createdAt"], ["desc"]);
        isNotesLoaded.value = true;
    };

    const createNote = async () => {
        const createdNote = await notesRepository.create(generateNote());
        notes.value = [createdNote, ...notes.value];
        selectNote(createdNote.id);
    };

    const selectNote = (id: Number) => {
        const note = notes.value.find((note: Note) => note.id === id);
        selectedNote.value = note;
    };

    const updateNoteContent = (content: string) => {
        selectedNote.value.resume = content.slice(0, 26);
        selectedNote.value.content = content;
    };

    const generateNote = (): Note => {
        return {
            content: "",
            resume: "",
        };
    };

    const deleteNode = async (id: number) => {
        await notesRepository.deleteOne(id);
        selectedNote.value = null;
        await loadNotes();
    };

    return { notes, selectedNote, isNotesLoaded, loadNotes, createNote, selectNote, updateNoteContent, deleteNode };
};
