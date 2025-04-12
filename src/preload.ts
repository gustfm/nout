import { app, contextBridge } from "electron";
import DatabaseHandler from "./repositories/DatabaseHandler";
import NotesRepository from "./repositories/NotesRepository";
import Note from "./app/Notes/Models/Note";
import FoldersRepository from "./repositories/FoldersRepository";

declare global {
    interface Window {
        notesRepository: NotesRepository;
        foldersRepository: FoldersRepository;
    }
}

const customArg = process.argv.find(arg => arg.startsWith('--user-data-dir='));
const myValue = customArg ? customArg.split('=')[1] : null;

try {
    const databaseHandler = new DatabaseHandler(myValue);
    databaseHandler.initDatabase();
} catch (err) {
    console.log(`Error when loading the database: ${err}`);
}

const foldersRepository = new FoldersRepository(myValue);
const notesRepository = new NotesRepository(myValue);

const notesRepositoryMethods: Omit<typeof notesRepository, "getDb"> = {
    getAll: () => notesRepository.getAll(),
    getAllById: (folderId: number) => notesRepository.getAllById(folderId),
    create: (note: Note) => notesRepository.create(note),
    findOne: (id: number) => notesRepository.findOne(id),
    deleteOne: (id: number) => notesRepository.deleteOne(id),
    save: (noteId: number, noteTitle: string, noteContent: string) => notesRepository.save(noteId, noteTitle, noteContent),
};

const foldersRepositoryMethods: Omit<typeof foldersRepository, "getDb"> = {
    getAll: () => foldersRepository.getAll(),
    createFolder: (folderName: string) => foldersRepository.createFolder(folderName),
    findOne: (id: number) => foldersRepository.findOne(id),
    updateFolderIcon: (id: number, icon: string) => foldersRepository.updateFolderIcon(id, icon)
};

contextBridge.exposeInMainWorld("notesRepository", notesRepositoryMethods);
contextBridge.exposeInMainWorld("foldersRepository", foldersRepositoryMethods);
