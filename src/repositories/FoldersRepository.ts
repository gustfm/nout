import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { dbPath } from "./DbPath";
import Folder, { FolderDto } from "../app/Folders/Models/Folder";

export default class FoldersRepository {
    constructor(private dbPath: string) {}

    protected async getDb(): Promise<Database> {
        return await open({ filename: `${this.dbPath}/nout_database.db`, driver: sqlite3.Database });
    }

    public async getAll(): Promise<Folder[]> {
        const db = await this.getDb();
        const result: FolderDto[] = await db.all(`
            select f.id, f.icon, f.name, count(n.id) as notesCount from folders f
            left join notes n
            on f.id = n.folder_id
            group by f.id;
        `);
        return result.map((item) => new Folder(item));
    }

    public async createFolder(folderName: string): Promise<Folder> {
        const db = await this.getDb();
        const result = await db.run("INSERT INTO folders (name, icon) VALUES (?, ?)", folderName, "📁");
        return await this.findOne(result.lastID);
    }

    public async findOne(id: number): Promise<Folder> {
        const db = await this.getDb();
        return await db.get("SELECT * FROM folders WHERE id = ?", id);
    }

    public async updateFolderIcon(id: number, icon: string): Promise<void> {
        const db = await this.getDb();
        await db.run("UPDATE folders SET icon = ? WHERE id = ?", icon, id);
    }
}
