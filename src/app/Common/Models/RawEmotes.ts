export default interface RawEmotes {
    id: string;
    keywords: string[];
    name: string;
    skins: Skin[];
}

export interface Skin {
    unified: string;
    native: string;
}