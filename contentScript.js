function getPageContent() {
    const mainContent = document.body.innerText;
    const title = document.title;
    return {
        title: title,
        content: mainContent.substring(0, 1500),
        url: window.location.href
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const pageContent = getPageContent();
    chrome.storage.local.set({ 'currentPageContent': pageContent });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getContent") {
        sendResponse(getPageContent());
    }
});
