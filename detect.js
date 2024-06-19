async function fetchJsonFile(path) {
    const response = await fetch(browser.runtime.getURL(path));
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
}

async function saveFlagPhrases(localStorageKey) {
    const flagPhrasesPath = 'data/words.json';
    const flagPhrases = await fetchJsonFile(flagPhrasesPath);
    localStorage.setItem(localStorageKey, JSON.stringify(flagPhrases));
}

async function loadFlagPhrases() {
    const localStorageKey = "flagPhrases";
    if (!localStorage.getItem(localStorageKey)) {
        saveFlagPhrases(localStorageKey);
    }
    const flagPhrases = JSON.parse(localStorage.getItem(localStorageKey));
    return flagPhrases;
}

async function saveContentCategories(localStorageKey) {
    const contentCategoriesPath = 'data/categories.json';
    const contentCategories = await fetchJsonFile(contentCategoriesPath);
    localStorage.setItem(localStorageKey, JSON.stringify(contentCategories));
}

async function loadContentCategories() {
    const localStorageKey = "contentCategories";
    if (!localStorage.getItem(localStorageKey)) {
        saveContentCategories(localStorageKey);
    }
    const contentCategories = JSON.parse(localStorage.getItem(localStorageKey));
    return contentCategories;
}

function extractAllWords(textContent) {
    const wordContent = textContent.match(/\b[a-zA-Z]+\b/g);
    return wordContent;
}

function countFlagPhrases(flagPhrases) {
    const textContent = document.body.textContent;
    const extractedWords = extractAllWords(textContent);
    const flagPhraseCounts = new Map(flagPhrases.map(word => [word, 0]));
    extractedWords.forEach(word => {
        if (flagPhraseCounts.has(word)) {
            flagPhraseCounts.set(word, flagPhraseCounts.get(word) + 1);
        }
    });
    return flagPhraseCounts;
}

function foundCategoriesToArray(categoryFlagPhrases, contentCategories) {
    const foundCategories = Object.keys(categoryFlagPhrases).map(category => ({
        category: category,
        keywords: categoryFlagPhrases[category],
        ...contentCategories[category]
    }));
    return foundCategories;
}

function mapFlagPhrasesToCategories(flagPhrases, contentCategories) { 
    const flagPhraseCounts = countFlagPhrases(Object.keys(flagPhrases));
    const foundFlagPhrases = Array.from(flagPhraseCounts).filter(entry => entry[1] > 0);
    const categoryFlagPhrases = {};
    foundFlagPhrases.forEach(([phrase]) => {
        const categories = flagPhrases[phrase];
        categories.forEach(category => {
            if (!categoryFlagPhrases[category]) {
                categoryFlagPhrases[category] = [];
            }
            categoryFlagPhrases[category].push(phrase);
        });
    });
    const foundCategories = foundCategoriesToArray(categoryFlagPhrases, contentCategories);
    return foundCategories;
}

async function detectContentCategories() {
    const flagPhrases = await loadFlagPhrases();
    const contentCategories = await loadContentCategories();
    const foundCategories = mapFlagPhrasesToCategories(flagPhrases, contentCategories);
    return foundCategories;
}

detectContentCategories();