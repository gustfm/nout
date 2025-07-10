import { orderBy } from "lodash";
import NotesRepository from "src/repositories/NotesRepository";
import Note from "../Models/Note";

export default class NotesService {
    public notes: Array<Note> = [];
    public selectedNote: Note = null;
    public unchangedSelectedNoteContent: string = null;
    public isSavingSelectedNote: boolean = false;
    public isLoadingNotes: boolean = false;

    public constructor(private readonly notesRepository: NotesRepository) {}

    public get hasSeletedNoteContentUnsavedChanges(): boolean {
        if (this.unchangedSelectedNoteContent === null) {
            return false;
        }
        return this.unchangedSelectedNoteContent !== this.selectedNote?.content;
    }

    public async loadRelatedNotes(folderId: number) {
        this.isLoadingNotes = true;
        const results = await this.notesRepository.getAllById(folderId);
        this.notes = orderBy(results, ["createdAt"], ["desc"]);
        this.isLoadingNotes = false;
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
            this.updateUnchangedContent(this.selectedNote.content);
        } catch (err) {
            console.error(err);
        } finally {
            this.isSavingSelectedNote = false;
        }
    }

    public selectNote(id: Number) {
        try {
            if (!id) {
                this.selectedNote = undefined;
                this.updateUnchangedContent(undefined);
                return;
            }
            const note = this.notes.find((note: Note) => note.id === id);
            this.selectedNote = JSON.parse(JSON.stringify(note));
            this.updateUnchangedContent(note.content);
        } catch (err) {
            console.error(err);
        }
    }

    public updateUnchangedContent(content: string): void {
        this.unchangedSelectedNoteContent = content;
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
            title: "",
            content: "",
            folderId,
        };
    }
}
