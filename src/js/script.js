function init() {
    if (document.readyState === "complete") {
        printFoundCategories();
    } else {
        window.addEventListener("load", printFoundCategories);
    }
}

async function printFoundCategories() {
    await resetFlagPhrases();
    await resetContentCategories();
    const foundCategories = await detectContentCategories();
    console.log(foundCategories);
}


function clearLocalStorage(localStorageKey) {
    localStorage.removeItem(localStorageKey);
}

async function resetFlagPhrases() {
    clearLocalStorage("flagPhrases");
    await saveFlagPhrases("flagPhrases");
}

async function resetContentCategories() {
    clearLocalStorage("contentCategories");
    await saveContentCategories("contentCategories");
}

init()