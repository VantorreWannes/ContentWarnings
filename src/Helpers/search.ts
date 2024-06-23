export class SearchService<T> {
    readonly haystack: T[];

    constructor(haystack: T[]) {
        this.haystack = haystack;
    }

    public findAllOccurences(needles: T[]): T[] {
        const flag_phrase_counts = this.countOccurences(needles);
        return needles.filter(needle => flag_phrase_counts.get(needle) > 0);
    }

    public countOccurences(words: T[]): Map<T, number> {
        const word_map = new Map<T, number>(words.map(word => [word, 0]));
        for (const word of this.haystack) {
            if (word_map.has(word)) {
                word_map.set(word, word_map.get(word) + 1);
            }
        }
        return word_map;
    }
}