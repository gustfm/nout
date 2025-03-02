import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { getDbPath } from "./DbPath";

export default class DatabaseHandler {
    private async getDb(): Promise<Database> {
        return await open({ filename: getDbPath(), driver: sqlite3.Database });
    }

    public async initDatabase(): Promise<void> {
        const db = await this.getDb();
        await db.exec(
            `CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                title TEXT,
                created_at DATE DEFAULT current_date,
                folder_id INTEGER,

                FOREIGN KEY (folder_id) REFERENCES folders(id)
            );

            CREATE TABLE IF NOT EXISTS folders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(240)
            );

            `
        );
    }
}
