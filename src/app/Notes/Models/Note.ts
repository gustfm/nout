export default class Note {
    public id?: number;
    public title: string;
    public content: string;
    public createdAt?: string;
    public folderId?: number;

    constructor(note: NoteDto) {
        this.id = note.id;
        this.title = note.title;
        this.content = note.content;
        this.createdAt = note.created_at;
        this.folderId = note.folder_id;
    }
}

export interface NoteDto {
    id?: number;
    title: string;
    content: string;
    created_at: string;
    folder_id?: number;
}
