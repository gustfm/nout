import { contextBridge } from "electron";
import DatabaseHandler from "./Repository/DatabaseHandler";
import NotesRepository from "./Repository/NotesRepository";
import Note from "./app/Notes/Models/Note";
import FoldersRepository from "./Repository/FoldersRepository";

declare global {
    interface Window {
        notesRepository: NotesRepository;
        foldersRepository: FoldersRepository;
    }
}

try {
    const databaseHandler = new DatabaseHandler();
    databaseHandler.initDatabase();
} catch (err) {
    console.log(`Error when loading the database: ${err}`);
}

const foldersRepository = new FoldersRepository();
const notesRepository = new NotesRepository();

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
};

contextBridge.exposeInMainWorld("notesRepository", notesRepositoryMethods);
contextBridge.exposeInMainWorld("foldersRepository", foldersRepositoryMethods);
