import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

export default class DatabaseHandler {
    constructor(private dbPath: string) {}

    private async getDb(): Promise<Database> {
        return await open({ filename: `${this.dbPath}/nout_database.db`, driver: sqlite3.Database });
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
                icon VARCHAR(20),
                name VARCHAR(240)
            );

            `
        );
    }
}
