window.addEventListener('load', async () => {
    await resetFlagPhrases();
    const foundContentCategories = await detectContentCategories();
    console.log(foundContentCategories);
});

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