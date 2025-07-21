import { orderBy } from "lodash";
import NotesRepository from "src/repositories/NotesRepository";
import Note from "../Models/Note";
import { sortNotes } from "../../Common/Utils/Utils";

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

    public get filteredNotes(): Note[] {
        const pinnedNotes = this.notes.filter((note) => note.isFixed);
        const unpinnedNotes = this.notes.filter((note) => !note.isFixed);
        return [...sortNotes(pinnedNotes), ...sortNotes(unpinnedNotes)];
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
            await this.loadRelatedNotes(this.selectedNote.folderId);
        } catch (err) {
            console.error(err);
        } finally {
            this.isSavingSelectedNote = false;
        }
    }

    public async selectNote(id: number) {
        try {
            if (!id) {
                this.selectedNote = null;
                this.updateUnchangedContent(null);
                return;
            }
            this.selectedNote = await this.notesRepository.getNote(id);
            this.updateUnchangedContent(this.selectedNote.content);
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

    public async handlePin(id: number): Promise<void> {
        const note = this.notes.find((note) => note.id === id);
        await this.notesRepository.handlePin(id);
        await this.loadRelatedNotes(note.folderId);
    }

    public async handleUnpin(id: number): Promise<void> {
        const note = this.notes.find((note) => note.id === id);
        await this.notesRepository.handleUnpin(id);
        await this.loadRelatedNotes(note.folderId);
    }

    private generateNote(folderId: number): Note {
        return {
            title: "",
            content: "",
            folderId,
            isFixed: false,
        };
    }
}
