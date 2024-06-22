import { ContentCategory } from "./Entities/content_category";
import { SearchService } from "./Helpers/search";
import browser from "webextension-polyfill";
import { LocallyStoredItem } from "./Helpers/stored_item";

async function main() {
    const content_categories_path = browser.runtime.getURL("dist/data/content_categories.json");
    const stored_content_categories = new LocallyStoredItem<ContentCategory[]>("content-categories", content_categories_path);
    const content_categories = await stored_content_categories.get();
    const occurences = getOccurences(document.body.textContent, content_categories);
    console.log(occurences);
}

function getOccurences(text: string, content_categories: ContentCategory[]): { category: ContentCategory, found_phrases: string[] }[] {
    const words: string[] = text.match(/\b[a-zA-Z]+\b/g);
    const search_service = new SearchService<string>(words);
    const occurences = content_categories.map(category => {
        const found_phrases = search_service.findAllOccurences((category.flag_phrases ?? []));
        if (found_phrases.length > 0) {
            return { category, found_phrases };
        }
    });
    return occurences.filter(occurence => occurence != undefined);
}

main();
