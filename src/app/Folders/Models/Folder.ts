export default class Folder {
    id?: number;
    icon: string;
    name: string;
    notesCount: number;

    constructor(note: FolderDto) {
        this.id = note.id;
        this.icon = note.icon;
        this.name = note.name;
        this.notesCount = note.notesCount;
    }
}

export interface FolderDto {
    id?: number;
    icon: string;
    name: string;
    notesCount: number;
}
