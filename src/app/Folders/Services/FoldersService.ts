import { orderBy } from "lodash";
import FoldersRepository from "src/repositories/FoldersRepository";
import Folder from "../Models/Folder";

export default class FoldersService {
    public folders: Array<Folder> = [];
    public selectedFolder: Folder = null;
    public isFoldersLoaded = false;

    public constructor(private readonly foldersRepository: FoldersRepository) {}

    public async loadFolders(): Promise<void> {
        const results = await this.foldersRepository.getAll();
        this.folders = orderBy(results, ["createdAt"], ["desc"]);
        this.isFoldersLoaded = true;
    }

    public getFolder(id: number): Folder {
        return this.folders.find((folder: Folder) => folder.id === id);
    }

    public async createFolder(folderName: string): Promise<void> {
        const createdFolder = await this.foldersRepository.createFolder(folderName);
        this.folders = [createdFolder, ...this.folders];
        await this.loadFolders();
    }

    public selectFolder(folderId: number) {
        const folder = this.getFolder(folderId);
        this.selectedFolder = folder;
    }

    public async changeFolderEmote(folderId: number, folderIcon: string) {
        await this.foldersRepository.updateFolderIcon(folderId, folderIcon);
        const selectedFolder = this.folders.find(folder => folder.id === folderId);
        selectedFolder.icon = folderIcon;
    }
}
