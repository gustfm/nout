import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import Note, { NoteDto } from "../app/Note/Note";
import { getDbPath } from "./DbPath";

export default class NotesRepository {
    protected async getDb(): Promise<Database> {
        return await open({ filename: getDbPath(), driver: sqlite3.Database });
    }

    public async getAll(): Promise<Note[]> {
        const db = await this.getDb();
        const result: NoteDto[] = await db.all("SELECT * FROM notes ORDER BY created_at DESC");
        return result.map((item) => new Note(item));
    }

    public async create(note: Note): Promise<Note> {
        const db = await this.getDb();
        const result = await db.run("INSERT INTO notes (resume, content) VALUES (?,?)", note.resume, note.content);
        return await this.findOne(result.lastID);
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
