export default class Folder {
    id?: number;
    name: string;
    notesCount: number;

    constructor(note: FolderDto) {
        this.id = note.id;
        this.name = note.name;
        this.notesCount = note.notesCount;
    }
}

export interface FolderDto {
    id?: number;
    name: string;
    notesCount: number;
}
