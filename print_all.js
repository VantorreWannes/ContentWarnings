// This script would be injected into every page the user visits

function PrintAllText() {
    const text = document.body.innerHTML;
    console.log(text);
}

// Call the function on page load
PrintAllText();
