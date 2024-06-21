import { storage } from "webextension-polyfill";

export interface IStoredItem<T> {
    get(): Promise<T>;
    update(): Promise<void>;
}

export abstract class StoredItem<T> implements IStoredItem<T> {
    protected readonly name: string;
    protected readonly path: string;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }

    protected async download(): Promise<T> {
        const response = await fetch(this.path);
        if (!response.ok) {
            throw new Error(`Download HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    }

    protected abstract set(data: T): Promise<void>;

    public async get(): Promise<T> {
        const json = localStorage.getItem(this.name);
        if (json == null) {
            const data = await this.download();
            await this.set(data);
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

export class LocallyStoredItem<T> extends StoredItem<T> {
    
    protected async set(data: T): Promise<void> {
        const value = JSON.stringify(data);
        storage.local.set({name:value});
    }
}

export class SyncedStoredItem<T> extends StoredItem<T> {
    
    protected async set(data: T): Promise<void> {
        const value = JSON.stringify(data);
        storage.sync.set({name:value});
    }
}

export class SessionStoredItem<T> extends StoredItem<T> {
    
    protected async set(data: T): Promise<void> {
        const value = JSON.stringify(data);
        storage.session.set({name:value});
    }
}