console.log("Background script is running!");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Kaia installed or updated!");
});
