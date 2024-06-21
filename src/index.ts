import { IStoredItem, LocallyStoredItem } from "./Entities/stored_item";
import browser from "webextension-polyfill";

async function main() {
    const phrases_file_path = browser.runtime.getURL("dist/data/flag_phrases.json");
    const categories = browser.runtime.getURL("dist/data/content_categories.json");
    const phrases_stored = new LocallyStoredItem("flag-phrases", phrases_file_path);
    const categories_stored = new LocallyStoredItem<Array<string>>("content-categories", categories);
    await printStoredItem(phrases_stored);
    await printStoredItem(categories_stored);
}

async function printStoredItem<T>(stored: IStoredItem<T>) {
    const phrases = await stored.get();
    console.log(phrases);
} 

main();
    