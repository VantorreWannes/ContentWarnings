window.addEventListener('load', async () => {
    const foundContentCategories = await detectContentCategories();
    console.log(foundContentCategories);
});