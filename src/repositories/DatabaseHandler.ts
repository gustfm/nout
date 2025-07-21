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
                is_fixed BOOLEAN DEFAULT false,

                FOREIGN KEY (folder_id) REFERENCES folders(id)
            );

            CREATE TABLE IF NOT EXISTS folders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                icon VARCHAR(20),
                name VARCHAR(240)
            );

            CREATE TRIGGER IF NOT EXISTS update_updated_at
            AFTER UPDATE ON notes
            FOR EACH ROW
            BEGIN
                UPDATE notes
                SET updated_at = CURRENT_DATE
                WHERE id = OLD.id;
            END;
            `
        );
    }
}
