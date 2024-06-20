

export interface StoredItem<T> {
    readonly name: string;
    readonly path: string;
    get(): Promise<T>;
    update(): Promise<void>;
}

export class LocallyStoredItem<T> implements StoredItem<T> {
    readonly name: string;
    readonly path: string;
    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
    private async download(): Promise<T> {
        const response = await fetch(this.path);
        if (!response.ok) {
            throw new Error(`Download HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    }

    private set(data: T): void {
        const json = JSON.stringify(data);
        localStorage.setItem(this.name, json);
    }

    public async get(): Promise<T> {
        const json = localStorage.getItem(this.name);
        if (json == null) {
            const data = await this.download();
            this.set(data);
            return data;
        }
        else {
            const data = JSON.parse(json);
            return data;
        }
    }

    public async update(): Promise<void> {
        const data = await this.download();
        this.set(data);
    }
}