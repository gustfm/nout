export default class Note {
    public id?: number;
    public title: string;
    public content: string;
    public createdAt?: string;
    public updatedAt?: string;
    public isFixed: boolean;
    public folderId?: number;

    constructor(note: NoteDto) {
        this.id = note.id;
        this.title = note.title;
        this.content = note.content;
        this.createdAt = note.created_at;
        this.updatedAt = note.updated_at;
        this.isFixed = Boolean(note.is_fixed);
        this.folderId = note.folder_id;
    }
}

export interface NoteDto {
    id?: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    folder_id?: number;
    is_fixed?: boolean;
}
