class Json {
    public static toJson<T>(data: T): string {
        return JSON.stringify(data);
    }

    public static fromJson<T>(data: string): T {
        const json = JSON.parse(data);
        if (!json) throw new Error("Json didn't match the type specified");
        return json;
    }
}