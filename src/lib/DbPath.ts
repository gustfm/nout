import path from "path";

const getDbPath = (): string => {
    const directoryRoot = path.resolve("./");
    return `${directoryRoot}/src/resources/database.db`;
}

export { getDbPath };