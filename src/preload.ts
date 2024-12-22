import { contextBridge } from "electron";
import Note from "./app/Note/Note";
import DatabaseHandler from "./lib/DatabaseHandler";
import NotesRepository from "./lib/NotesRepository";

declare global {
    interface Window {
        notesRepository: NotesRepository;
    }
}

try {
    const databaseHandler = new DatabaseHandler();
    databaseHandler.initDatabase();
} catch (err) {
    console.log(`Error when loading the database: ${err}`);
}

const notesRepository = new NotesRepository();
const methods: Omit<typeof notesRepository, "getDb"> = {
    getAll: () => notesRepository.getAll(),
    create: (note: Note) => notesRepository.create(note),
    findOne: (id: number) => notesRepository.findOne(id),
    deleteOne: (id: number) => notesRepository.deleteOne(id),
};

contextBridge.exposeInMainWorld("notesRepository", methods);
