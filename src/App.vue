<template>
    <div v-if="isFoldersLoaded" class="application">
        <FoldersList
            :folders="foldersService.folders"
            :selectedFolder="foldersService.selectedFolder"
            @selectFolder="selectFolder"
            @createFolder="createFolder"
            @changeFolderEmote="changeFolderEmote"
        />
        <NotesList
            :notes="notesService.notes"
            :selectedNote="selectedNote"
            :isLoadingNotes="isLoadingNotes"
            :hasSeletedNoteContentUnsavedChanges="notesService.hasSeletedNoteContentUnsavedChanges"
            @selectNote="selectNote"
            @createNote="createNote"
        />
        <NoteContainer
            :selectedNote="selectedNote"
            :isSavingSelectedNote="isSavingSelectedNote"
            @deleteNote="deleteNote"
            @saveCurrentNoteContent="saveCurrentNoteContent"
        />

        <UnsavedModal v-model="unsavedModal.isOpen" />
    </div>
</template>

<script lang="ts">
import { Component, toNative, Vue } from "vue-facing-decorator";
import FoldersList from "./app/Folders/FoldersList.vue";
import NoteContainer from "./app/NoteEditorPanel/NoteContainer.vue";
import NotesList from "./app/Notes/NotesList.vue";
import FoldersRepository from "./repositories/FoldersRepository";
import NotesRepository from "./repositories/NotesRepository";
import NotesService from "./app/Notes/Services/NotesService";
import FoldersService from "./app/Folders/Services/FoldersService";
import Note from "./app/Notes/Models/Note";
import { ComposableModal, useModal } from "./app/Common/Composables/useModal";
import UnsavedModal from "./app/Common/Components/UnsavedModal.vue";
import { UnsavedChangesModal } from "./app/Common/Services/UnsavedChangesModal";

@Component({
    components: { FoldersList, NotesList, NoteContainer, UnsavedModal },
})
class App extends Vue {
    public foldersRepository: FoldersRepository = null;
    public notesRepository: NotesRepository = null;
    public notesService: NotesService = null;
    public foldersService: FoldersService = null;
    public unsavedModal: ComposableModal = null;

    public get isFoldersLoaded(): boolean {
        return this.foldersService?.isFoldersLoaded;
    }

    public get isSavingSelectedNote(): boolean {
        return this.notesService?.isSavingSelectedNote;
    }

    public get isLoadingNotes(): boolean {
        return this.notesService.isLoadingNotes;
    }

    public get selectedNote(): Note {
        return this.notesService?.selectedNote;
    }

    public async mounted() {
        this.unsavedModal = useModal();
        this.mountRepositories();
        this.initializeServices();

        await this.foldersService.loadFolders();
    }

    public mountRepositories(): void {
        const { foldersRepository, notesRepository } = window;
        this.foldersRepository = foldersRepository;
        this.notesRepository = notesRepository;
    }

    public initializeServices() {
        this.notesService = new NotesService(this.notesRepository);
        this.foldersService = new FoldersService(this.foldersRepository);
    }

    public async selectFolder(folderId: number): Promise<void> {
        if (this.notesService.selectedNote && this.notesService.hasSeletedNoteContentUnsavedChanges) {
            try {
                await UnsavedChangesModal.openModal();
            } catch (err) {
                console.log("Discarting changes...");
                return;
            }
        }
        this.foldersService.selectFolder(folderId);
        await this.notesService.loadRelatedNotes(folderId);
        this.notesService.clearCurrentNoteSelection();
    }

    public saveCurrentNoteContent(): void {
        this.notesService.saveCurrentNoteContent();
    }

    public createFolder(folderName: string): void {
        this.foldersService.createFolder(folderName);
    }

    public async selectNote(id: number) {
        if (this.notesService.selectedNote && this.notesService.hasSeletedNoteContentUnsavedChanges) {
            try {
                await UnsavedChangesModal.openModal();
            } catch (err) {
                console.log("Discarting changes...");
                return;
            }
        }
        this.notesService.selectNote(id);
    }

    public changeFolderEmote(folderId: number, folderIcon: string) {
        this.foldersService.changeFolderEmote(folderId, folderIcon);
    }

    public async createNote() {
        await this.notesService.createNote(this.foldersService.selectedFolder.id);
        await this.foldersService.loadFolders();
    }

    public async deleteNote(noteId: number): Promise<void> {
        const { selectedFolder } = this.foldersService;
        await this.notesService.deleteNote(noteId);
        await this.notesService.loadRelatedNotes(selectedFolder.id);
    }
}

export default toNative(App);
</script>

<style scoped>
.application {
    width: 100vw;
    height: 100vh;
    display: flex;
}
</style>
