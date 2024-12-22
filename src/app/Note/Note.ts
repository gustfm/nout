export default class Note {
    id?: number;
    resume: string;
    content: string;
    createdAt?: string;

    constructor(note: NoteDto) {
        this.id = note.id;
        this.resume = note.resume;
        this.content = note.content;
        this.createdAt = note.created_at;
    }
}

export interface NoteDto {
    id?: number;
    resume: string;
    content: string;
    created_at: string;
}
