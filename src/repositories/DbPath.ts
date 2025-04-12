import path from "path";

const dbPath = path.join(__dirname, "database.db").replace('/app.asar', '');

export { dbPath };
