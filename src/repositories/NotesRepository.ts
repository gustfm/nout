import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { dbPath } from "./DbPath";
import Note, { NoteDto } from "../app/Notes/Models/Note";

export default class NotesRepository {
    constructor(private dbPath: string) {}

    protected async getDb(): Promise<Database> {
        return await open({ filename: `${this.dbPath}/nout_database.db`, driver: sqlite3.Database });
    }

    public async getAll(): Promise<Note[]> {
        const db = await this.getDb();
        const result: NoteDto[] = await db.all("SELECT * FROM notes ORDER BY created_at DESC");
        return result.map((item) => new Note(item));
    }

    public async getAllById(folderId: number): Promise<Note[]> {
        const db = await this.getDb();
        const result: NoteDto[] = await db.all(`SELECT * FROM notes WHERE folder_id = ${folderId} ORDER BY created_at DESC`);
        return result.map((item) => new Note(item));
    }

    public async create(note: Note): Promise<Note> {
        const db = await this.getDb();
        const result = await db.run(
            "INSERT INTO notes (title, content, folder_id) VALUES (?,?,?)",
            note.title,
            note.content,
            note.folderId
        );
        return await this.findOne(result.lastID);
    }

    public async save(noteId: number, noteTitle: string, noteContent: string) {
        try {
            const db = await this.getDb();
            await db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", noteTitle, noteContent, noteId);
        } catch (err) {
            console.log(err);
        }
    }

    public async findOne(id: number): Promise<Note> {
        const db = await this.getDb();
        return await db.get("SELECT * FROM notes WHERE id = ?", id);
    }

    public async deleteOne(id: number): Promise<void> {
        const db = await this.getDb();
        await db.run("DELETE FROM notes WHERE id = ?", id);
    }
}
