async function fetchJsonFile(path) {
    const response = await fetch(browser.runtime.getURL(path));
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
}

async function saveFlagPhrases(localStorageKey) {
    const flagPhrases = await fetchJsonFile('data/data.json');
    localStorage.setItem(localStorageKey, JSON.stringify(flagPhrases));
}

async function loadFlagPhrases() {
    const localStorageKey = "flagPhrases";
    if (!localStorage.getItem(localStorageKey))  {
        saveFlagPhrases(localStorageKey);
    }
    const flagPhrases = JSON.parse(localStorage.getItem(localStorageKey));
    return flagPhrases;
}

async function saveContentCategories(localStorageKey) {
    const contentCategories = await fetchJsonFile("data/categories.json");
    localStorage.setItem(localStorageKey, JSON.stringify(contentCategories));
}

async function loadContentCategories() {
    const localStorageKey = "contentCategories";
    if (!localStorage.getItem(localStorageKey))  {
        saveContentCategories(localStorageKey);
    }
    const contentCategories = JSON.parse(localStorage.getItem(localStorageKey));
    return contentCategories;
}

async function printAll() {
    const flagPhrases = await loadFlagPhrases();
    const contentCategories = await loadContentCategories();
    console.log(flagPhrases);
    console.log(contentCategories);
}

printAll();