import { orderBy } from "lodash";
import NotesRepository from "src/repositories/NotesRepository";
import Note from "../Models/Note";

export default class NotesService {
    public notes: Array<Note> = [];
    public selectedNote: Note = null;
    public isNotesLoaded: boolean = false;
    public isSavingSelectedNote: boolean = false;

    public constructor(private readonly notesRepository: NotesRepository) {}

    public get isLoadingNotes(): boolean {
        return !this.isNotesLoaded;
    }

    public async loadRelatedNotes(folderId: number) {
        const results = await this.notesRepository.getAllById(folderId);
        this.notes = orderBy(results, ["createdAt"], ["desc"]);
        this.isNotesLoaded = true;
    }

    public async createNote(currentFolderId: number) {
        const createdNote = await this.notesRepository.create(this.generateNote(currentFolderId));
        this.notes = [createdNote, ...this.notes];
        this.selectNote(createdNote.id);
    }

    public async saveCurrentNoteContent(): Promise<void> {
        this.isSavingSelectedNote = true;
        try {
            await this.notesRepository.save(this.selectedNote.id, this.selectedNote.title, this.selectedNote.content);
        } catch (err) {
            console.error(err);
        } finally {
            this.isSavingSelectedNote = false;
        }
    }

    public selectNote(id: Number) {
        try {
            if (!id) {
                this.selectedNote = null;
                return;
            }
            const note = this.notes.find((note: Note) => note.id === id);
            console.log(note);
            this.selectedNote = note;
        } catch (err) {
            console.error(err);
        }
    }

    public clearCurrentNoteSelection(): void {
        this.selectNote(null);
    }

    public async deleteNote(id: number) {
        await this.notesRepository.deleteOne(id);
        this.selectedNote = null;
    }

    private generateNote(folderId: number): Note {
        return {
            // title: "",
            content: "",
            folderId,
        };
    }
}
